#!/usr/bin/env bash
# Validates Conventional Commit subjects: type(optional-scope)!: description
#
# Usage:
#   PR_TITLE="..." check-conventional-commit.sh title
#   PR_TITLE=... HEAD_REF=... PR_NUMBER=... IS_FORK=... GH_TOKEN=... \
#     check-conventional-commit.sh pr-title                         # validate; auto-fix from branch name
#   BASE_SHA=... HEAD_SHA=... check-conventional-commit.sh commits   # non-merge commits in BASE..HEAD
#   check-conventional-commit.sh message "<subject>"                  # check one subject (local use)
#   check-conventional-commit.sh derive "<branch>"                    # print the title derived from a branch
set -euo pipefail

TYPES="feat|fix|chore|docs|refactor|test|style|perf|build|ci|revert"
PATTERN="^(${TYPES})(\([a-z0-9][a-z0-9._/-]*\))?!?: [^[:space:]].*$"

HELP="Expected: type(optional-scope): description
  Types: ${TYPES//|/, }
  Examples:
    ci: add GitHub Actions quality checks
    ci(security): add dependency and secret scanning
    feat(nav)!: replace the navigation layout"

is_valid() {
  [[ "$1" =~ $PATTERN ]]
}

# Branch naming (see CLAUDE.md): feat/, fix/, hotfix/, release/ or chore/, then lowercase words joined by
# hyphens. GitHub's default PR title for such a branch ("Feat/sanity cms") is never valid, so derive one:
#   feat/sanity-cms -> "feat: sanity cms"   fix/x -> "fix: x"   hotfix/x -> "fix: x"
#   chore/x -> "chore: x"                   release/v1.2.0 -> "chore: v1.2.0"
derive_title() {
  local ref="$1" type
  [[ "$ref" =~ ^(feat|fix|hotfix|release|chore)/([a-z0-9]+([.-][a-z0-9]+)*)$ ]] || return 1
  case "${BASH_REMATCH[1]}" in
    feat) type="feat" ;;
    fix | hotfix) type="fix" ;;
    release | chore) type="chore" ;;
  esac
  printf '%s: %s\n' "$type" "${BASH_REMATCH[2]//-/ }"
}

fail() {
  # $1: annotation title, $2: offending value
  echo "::error title=$1::\"$2\" is not a valid Conventional Commit. Expected type(optional-scope): description"
  echo "  ✗ $2"
}

case "${1:-}" in
  title)
    if is_valid "${PR_TITLE:?PR_TITLE is not set}"; then
      echo "✓ PR title: $PR_TITLE"
    else
      fail "Invalid PR title" "$PR_TITLE"
      echo "$HELP"
      echo "Edit the pull request title; this check re-runs automatically."
      exit 1
    fi
    ;;

  pr-title)
    # Keeps a valid title; otherwise renames the PR from its branch name and validates the result.
    # GitHub does not start a new run when a workflow edits the title, so rename and check happen here.
    title="${PR_TITLE:-}"
    if is_valid "$title"; then
      echo "✓ PR title: $title"
      exit 0
    fi
    if [[ "${IS_FORK:-false}" == "true" ]]; then
      fail "Invalid PR title" "$title"
      echo "$HELP"
      echo "Pull requests from forks are not renamed automatically. Edit the title; this check re-runs."
      exit 1
    fi
    if ! derived="$(derive_title "${HEAD_REF:?HEAD_REF is not set}")" || ! is_valid "$derived"; then
      fail "Invalid PR title" "$title"
      echo "$HELP"
      echo "The branch \"$HEAD_REF\" does not follow the naming rule (feat/, fix/, hotfix/, release/ or chore/"
      echo "followed by lowercase words joined by hyphens), so a title could not be generated."
      echo "Edit the pull request title; this check re-runs automatically."
      exit 1
    fi
    if [[ "${DRY_RUN:-}" == "1" ]]; then
      echo "(dry run) would rename PR #${PR_NUMBER:-?} to: $derived"
    else
      gh pr edit "${PR_NUMBER:?PR_NUMBER is not set}" --repo "${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is not set}" --title "$derived"
    fi
    echo "::notice title=PR title generated::Renamed \"$title\" to \"$derived\" from branch \"$HEAD_REF\"."
    echo "✓ PR title: $derived"
    ;;

  derive)
    derive_title "${2:?Pass the branch name}" || { echo "Branch does not follow the naming rule." >&2; exit 1; }
    ;;

  commits)
    : "${BASE_SHA:?BASE_SHA is not set}" "${HEAD_SHA:?HEAD_SHA is not set}"
    invalid=0
    count=0
    while IFS=$'\t' read -r sha subject; do
      [[ -z "$sha" ]] && continue
      count=$((count + 1))
      if is_valid "$subject"; then
        echo "✓ ${sha:0:7} $subject"
      else
        fail "Invalid commit message (${sha:0:7})" "$subject"
        invalid=$((invalid + 1))
      fi
    done < <(git log --no-merges --format='%H%x09%s' "${BASE_SHA}..${HEAD_SHA}")

    echo "Checked ${count} commit(s); ${invalid} invalid."
    if (( invalid > 0 )); then
      echo "$HELP"
      echo "Reword the listed commits locally (for example with git rebase -i), then push the branch again."
      exit 1
    fi
    ;;

  message)
    if is_valid "${2:?Pass the subject to check}"; then
      echo "✓ $2"
    else
      fail "Invalid commit message" "$2"
      echo "$HELP"
      exit 1
    fi
    ;;

  *)
    echo "Usage: $0 {title|pr-title|commits|message \"<subject>\"|derive \"<branch>\"}" >&2
    exit 2
    ;;
esac
