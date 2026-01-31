# Vault Snapshot

![Tests](https://img.shields.io/github/actions/workflow/status/mertso13/obsidian-vault-snapshot/lint.yml?branch=master&label=tests)

**Vault Snapshot** is a lightweight Obsidian plugin that generates a condensed Markdown summary of your entire vault or specific folders. It extracts titles, tags, and internal links from your notes, providing a flat, portable manifest ideal for:

- Providing concise context to LLMs without revealing content of your notes.
- Creating a searchable backup of your metadata.

## Features

- **Vault & Folder Scraping:** Recursively scans your entire vault or a user-defined folder.
- **Metadata Extraction:** Captures titles, tags (frontmatter & inline), and internal links.
- **Exclusion Rules:** Skip specific folders or files to keep your snapshot clean.
- **Output:** Generates the snapshot file within the plugin's configuration directory to avoid cluttering your vault's file explorer.

## Usage

1.  **Configure:** Go to **Settings -> Vault Snapshot**.
    - **Target folder:** Set to `/` for the whole vault, or specify a subfolder (e.g., `Projects`).
    - **Output filename:** Default is `vault-snapshot.md`.
    - **Excluded patterns:** Enter paths to ignore (one per line).
2.  **Generate:** Open the Command Palette (`Ctrl/Cmd + P`) and run:
    - `Vault Snapshot: Create snapshot`
3.  **Locate:** The snapshot file is saved in `.obsidian/plugins/obsidian-vault-snapshot/`

## Development

```console
foo@bar:~$ git clone git@github.com:mertso13/obsidian-vault-snapshot.git
foo@bar:~$ cd obsidian-vault-snapshot
foo@bar:~/obsidian-vault-snapshot$ npm install
foo@bar:~/obsidian-vault-snapshot$ npm run dev
```
