# Project Notes for Agents

## Project

- This is a SvelteKit site for pascal.com.
- Routes live under `src/routes/`.
- Shared library code and content live under `src/lib/`.
- Static legacy files and public assets live under `static/`.
- Use `npm run dev -- --host 0.0.0.0 --port <port>` for local preview when the user asks for one. This exposes both a local URL and a LAN URL.
- If a server is already running on a port, leave it alone unless the user asks otherwise.
- Use `npm run check` when appropriate, but be aware the repo may have existing unrelated type issues.

## Diary

- Current diary posts live under `src/lib/diary/<slug>/page.md`.
- `src/routes/diary/wp.json` is legacy WordPress data and is not the current source for displayed diary posts.
- New diary posts should be created as a folder containing `page.md`, with any post-specific images or demos colocated in that same folder.
- New posts should default to `status: draft` in frontmatter unless the user explicitly asks to publish them.
- Typical frontmatter:

  ```md
  ---
  title: Post Title
  date: 2026-06-09T14:00:00.000Z
  summary: Short summary for lists and metadata.
  tags: [tag one, tag two]
  status: draft
  ---
  ```

- Relative assets can be referenced from Markdown, for example:

  ```md
  ![Description](./image.png){ loading=lazy width=256 }
  ```

- In development mode, draft posts are visible and marked as drafts. Production filters drafts out via `fetchAllPosts()`.
