##  Important Notations

Use the following custom notations for special formatting within your notes:

* `[code]your_code_here[/code]` → for **inline code**
* `[bold]your_text_here[/bold]` → for **bold text**
* `[link]Link Text(URL)[/link]` → for **inline hyperlinks**

---

##  How to Add Your Notes Folder

Follow these steps to register a new notes file or folder in the project:

### 1. Update `website/data/sidebarData.js`

Add a new entry to the root array in the following format:

```js
{
  title: 'Title of Your Notes',
  path: 'Folder_name/File_name', // Path to the note file
  children: [], // Required only if you want to add multiple notes in one space (follow same format for children)
}
```

>  If you're adding a folder, populate the `children` array with its contents.

---

### 2. Add Your Notes in `website/data/content.js`

Define your note's content using the structure below:

```js
{
  title: 'Title of Your Note', // Can differ from the title in sidebarData
  path: 'Folder_name/File_name', // Must match the path used in sidebarData
  content: 'markdown format', // The note content using custom notations mentioned above
}
```

> Ensure the `path` value is **exactly the same** as in `sidebarData.js`.



---

### Guide to Writing Custom Markdown Format for Documentation

This custom Markdown format supports basic Markdown syntax with additional custom tags for interactive content rendering. Follow these rules to avoid errors and ensure proper display:

#### Supported Custom Tags

* `\[code]... \[/code]`: Used to highlight inline code (like a shortcode). Equivalent to `<code>...</code>` in HTML.
* `\[link]text(url) \[/link]`: Creates a clickable link with custom syntax. For example:
  `\[link]Docker Docs(https://docs.docker.com) \[/link]` → **Docker Docs**

#### Supported Code Blocks

* Use triple backticks (\`\`\`) with language type (`bash`, `yaml`, `dockerfile`, etc.) for proper syntax highlighting. (include '\' before backticks)

  \`\`\`bash
  commands
  \`\`\`

#### Tables

* Markdown tables work as-is. Make sure to use pipes `|` correctly and align columns with dashes `-`.

#### Lists

* Bullet points (`*`) and ordered lists (`1.`) follow standard Markdown rules.

#### Things to Avoid

* Do not forget the escape slashes (`\`) in custom tags: `\[code]`, not `[code]`.
* Avoid unescaped special characters (like unescaped `<` or `>` in plain text).
* Make sure your custom tags are closed properly (i.e., `\[code]...\[/code]`).
