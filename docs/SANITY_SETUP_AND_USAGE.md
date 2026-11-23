# Managing the portfolio with Sanity

This guide explains how to update the portfolio without touching code. No technical background is needed for the day-to-day sections (2 to 11).

---

## 1. What Sanity does here

- **Sanity** is a content management system (CMS): an online place where the portfolio's text, images, links and CV are stored and edited.
- **Sanity Studio** is the editing screen. It is built into the website at **`/manage`** (for example `https://my-portfolio-v2-ten-pi.vercel.app/manage`).
- **The website** reads the *published* content from Sanity and shows it to visitors.

**How they talk to each other:** each page asks Sanity for its content and keeps a copy for speed. Every page refreshes from Sanity at most once a minute, and Sanity's own cache can add up to about another minute. So **published changes appear on the live site within about 1 to 2 minutes, without a redeploy.**

**Security:** only members of the Sanity project can sign in to `/manage` and change content. Visitors can only see published content. The website stores no passwords; its only key is an optional read-only preview key, kept on the server (see [section 15](#15-previewing-changes-before-publishing)).

---

## 2. Signing in to `/manage`

1. Open the website's **`/manage`** page.
2. Choose the same sign-in method you used to create your Sanity account. For this project that is **E-mail / password**.
3. You will see the **Portfolio** menu on the left.

If you see "Connect this Studio to your project" or a CORS error, see [Troubleshooting](#14-troubleshooting).

**Who can sign in:** manage members at **sanity.io/manage → your project → Members**.
- **Add someone:** "Invite members", then pick a role. **Viewer** can only look; **Editor** can change content; keep **Administrator** for yourself.
- **Remove access:** click the member and choose **Remove**. Access ends immediately.

---

## 3. Drafts, publishing and hiding (read this once)

There are three different ideas. Keep them separate:

| What | Meaning | Visible on the website? |
| --- | --- | --- |
| **Draft** | You have made changes but not clicked **Publish** yet. | No. Visitors see the last published version. |
| **Published** | You clicked **Publish**. | Yes, within about 1 to 2 minutes, unless hidden. |
| **Hidden** ("Show on website" off) | Published, but deliberately kept off the site. | No. A hidden project's page returns "Page not found". |

- **Featured** is not the same as published: it only decides which project gets the large card.
- Every change is saved as a draft automatically. Nothing goes live until you click the green **Publish** button (bottom right).
- To undo unpublished changes, open the menu next to **Publish** and choose **Discard changes**.
- **Unpublish** removes a document from the website without deleting it.
- To see a change on the real pages before publishing, use the **Preview** tab (see [section 15](#15-previewing-changes-before-publishing)).

---

## 4. Editing your profile

**Portfolio → Profile.** The fields are grouped in tabs at the top:

- **Identity:** name, professional title (keep **Full-Stack Software Engineer**), title descriptor (**Backend-focused**), monogram (e.g. DNQ), footer statement, location (optional), and your **current professional role** (pick the experience entry for your current job; it appears on the homepage).
- **Homepage:** greeting, headline, the **highlighted phrase** (words from the headline shown with the marigold highlight; they must appear exactly in the headline), the hero introduction (select words and press **B** for bold), the "Right now" card and the homepage introduction.
- **About page:** heading, biography (one box per paragraph), areas of expertise, quick facts and interests.
- **Availability:** turn the badge on or off and change its text.
- **Photo:** upload a photo, add alternative text, and turn on **Show profile photo** (it appears on the About page).

Click **Publish** when you are done.

---

## 5. Social links

**Portfolio → Social links.**

- **Add a link:** click the pencil/plus icon, choose the **Platform**, enter a **Label** (the text shown, e.g. "DEV") and the **web address**.
  - For **Email**, enter only the address (e.g. `name@example.com`). The site turns it into an email link automatically.
  - For everything else, enter the full link starting with `https://`.
- **Hide a link:** open it, turn off **Show on website**, and **Publish**. It disappears everywhere (hero, footer, contact page).
- **Reorder:** drag the links in the list using the handle on the left. The website uses the same order.

---

## 6. Uploading or replacing your CV

**Portfolio → CV.**

1. Under **CV file (PDF)**, click **Upload** (or drag your PDF onto the field). To replace the CV, upload the new file the same way; the old one is replaced.
2. Turn on **Show CV on website**.
3. Change the **Button text** if you like (default "CV").
4. Click **Publish**.

The CV buttons in the header, mobile menu, footer and contact page appear automatically and always open the latest published PDF. Turn **Show CV on website** off to hide every CV link.

---

## 7. Creating and publishing projects

**Portfolio → Projects.** Click the plus icon to create a project. The tabs are:

- **Basics:** name, **slug** (click **Generate**; this becomes the address, e.g. `/projects/harvest-bridge`), category, short description (homepage cards and the case study), an optional **Projects page description** (a differently worded version for the Projects page; leave it empty to reuse the short description), status (Completed, In use, In development, Prototype) and optional custom status text (e.g. "Used at a live event").
- **Case study:** overview (one box per paragraph), problem or purpose, your role, and key features. For unfinished work, describe the current state honestly. Optional **Case study sections** add more headed sections after the key features (for example "How the system works" or "Current status"); each has a heading, paragraphs and optional bullet points, and you can drag them to reorder.
- **Technology:** the tools used. Tick **"These technologies are planned"** if they are not implemented yet; they are then shown as a dashed "Planned stack".
- **Images:** see the next section.
- **Links:**
  - If the code is private, turn on **Source code repository is private**. The site shows "Private repository" and never links to it.
  - Only add a **Live demo URL** if it really works publicly.
  - Use **Other links** for extras such as "API docs".
- **Visibility & display:** **Show on website**, **Featured** (the large card) and **Section**: "Main projects" (with a case-study page) or "More on GitHub" (compact list, no case study).

**Reorder projects** by dragging them in the Projects list. Click **Publish** to make a project live.

---

## 8. Project images

In a project's **Images** tab:

- **Thumbnail (optional):** shown on the Projects page and the case-study header. On the homepage, only the **featured** project shows its thumbnail; the other homepage cards always keep their colour strip. Without a thumbnail, the colour panel with initials is shown (set **Panel initials**, e.g. FMP).
- **Screenshots:** click **Add item** (or drag several images in). **Drag to reorder**; the website uses the same order.
- For every image, fill in **Alternative text** (a short description for people using screen readers). A caption is optional.
- Click an image and use the **crop and hotspot** tool to choose which part stays visible when the image is resized.

Only upload real screenshots of the product.

---

## 9. Experience

**Portfolio → Experience.** Add or edit entries with organisation, job title, type (optional), location (optional), start date, **I currently work here** (or an end date), and how dates are shown (month and year, or year only).

Under **Responsibilities and contributions**, describe your own contributions and avoid internal system names or confidential details. Turn off **Show on website** to hide an entry, and drag entries to reorder them.

---

## 10. Technical focus (skills)

**Portfolio → Technical focus.** Each category has **Main tools** (shown as filled tags) and **Other tools** (shown as dashed tags, for tools used in less depth). Type a tool and press Enter to add it. Drag categories to reorder them.

---

## 11. Site settings

**Portfolio → Site settings.**

- **General:** site title (added to every page title), default SEO description (aim for 150 to 160 characters), default social sharing image (optional, 1200 × 630 px), contact email, and footer text (e.g. "All rights reserved.").
- **Announcement:** turn on **Show banner** to display a message at the top of every page, with an optional link.
- **Page SEO:** optional title and description for individual pages. Leave a field empty to keep the default.

---

## 12. Environment variables

The website needs two public settings. Neither is secret: they identify the Sanity project, much like a public address. A third, optional setting enables the Preview tab.

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your project ID (sanity.io/manage → your project → overview) |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_READ_TOKEN` (optional, **secret**) | A **Viewer** token for previews (see section 15). Server-side only. |

- **On your computer:** copy `.env.example` to `.env` (or `.env.local`) and fill in the project ID. These files are never committed.
- **Never add a Sanity token** with a `NEXT_PUBLIC_` prefix. The only token this project uses is the optional read-only preview token, and it must keep its exact name `SANITY_API_READ_TOKEN`.

---

## 13. Vercel and GitHub configuration

**Vercel** (project → **Settings → Environment Variables**): add both public variables above with type **Config** (not Secret) and tick **Production, Preview and Development**. For the Preview tab, also add `SANITY_API_READ_TOKEN` as **Sensitive**, ticking the same three environments. Redeploy once after adding them.

GitHub needs only the two public variables; the build works without the preview token.

**GitHub** (repository → **Settings → Secrets and variables → Actions → Variables** tab): add the same two variables so CI can build the site.

**Sanity** (sanity.io/manage → your project → **API → CORS origins**): the addresses allowed to use the Studio, each with **Allow credentials** ticked:
- `http://localhost:3000`
- `https://my-portfolio-v2-ten-pi.vercel.app`
- any custom domain you add later

**For developers:** after changing a schema (in `src/sanity/schemaTypes`) or a query (in `src/sanity/lib/queries.ts`), run `yarn typegen` to regenerate `src/sanity/types.ts`, and commit the result.

---

## 14. Troubleshooting

| Problem | What to do |
| --- | --- |
| **"Connect this Studio to your project" or a CORS error at `/manage`** | Add the exact address you are using (including `https://` and any custom domain) under **API → CORS origins** with **Allow credentials** ticked. |
| **Sign-in keeps looping** | Allow third-party cookies for `sanity.io` in your browser, or try another browser. Make sure you use the same sign-in method as your account. |
| **"You don't have access"** | Your account is not a member of this project. Check **Members** at sanity.io/manage. |
| **My change is not on the website** | Did you click **Publish**? Is **Show on website** on? Then wait about 2 minutes and refresh. |
| **The CV button does not appear** | A PDF must be uploaded **and** "Show CV on website" turned on, then published. |
| **A project page says "Page not found"** | Check the project is published, **Show on website** is on, and **Section** is "Main projects". |
| **A Publish button is greyed out** | A required field is missing. Look for the red warning on the field. |
| **The Vercel build fails with "Missing environment variable"** | Add both `NEXT_PUBLIC_SANITY_*` variables in Vercel (and GitHub Variables for CI). |
| **The build fails with "Sanity content is missing"** | Publish the **Profile** and **Site settings** documents. |
| **The Preview tab says "Preview is not configured" or shows only published content** | Add `SANITY_API_READ_TOKEN` (a Viewer token) in Vercel or `.env.local`, then redeploy or restart. |
| **Preview stays blank in Firefox or Safari** | Allow cookies for the site, or use Chrome. The preview needs a cookie inside the Studio frame. |

**Seed script (developers only):** `scripts/seed-sanity.ts` copied the original content into Sanity once. Do not re-run it: it would overwrite your edits with the original text.

---

## 15. Previewing changes before publishing

The **Preview** tab at the top of `/manage` shows the real website next to the editing fields.

- **Hover** over text or images in the preview to see outlines. **Click** one to open the exact field that controls it.
- **Edits appear in the preview** within a second or two, before you publish. Visitors still see only published content.
- Each document also lists the pages it is **used on**, with links to open them in the preview.
- Use the toolbar to switch between desktop and mobile widths.
- A small **Preview mode · Exit** button appears on previewed pages. Click it if you ever see it outside the Studio.

**One-time setup** (needed for the Preview tab to show drafts):
1. **sanity.io/manage → your project → API → Tokens → Add API token.** Name it "Portfolio preview" and choose **Viewer** (read-only). Copy it.
2. **Vercel → Settings → Environment Variables:** add `SANITY_API_READ_TOKEN` with the token as a **Sensitive** value for Production, Preview and Development, then redeploy.
3. **On your computer:** add the same line to `.env.local` and restart the dev server.

The token can read drafts but cannot change anything. It stays on the server and is never sent to visitors' browsers. Preview mode can only be switched on from the Studio by signed-in project members.

