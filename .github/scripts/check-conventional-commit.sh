#!/usr/bin/env bash
# Validates Conventional Commit subjects: type(optional-scope)!: description
#
# Usage:
#   PR_TITLE="..." check-conventional-commit.sh title
#   BASE_SHA=... HEAD_SHA=... check-conventional-commit.sh commits   # non-merge commits in BASE..HEAD
#   check-conventional-commit.sh message "<subject>"                  # check one subject (local use)
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
    echo "Usage: $0 {title|commits|message \"<subject>\"}" >&2
    exit 2
    ;;
esac
