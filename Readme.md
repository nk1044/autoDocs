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
  Type: 'File', // Options: 'File' or 'Folder'
  children: [], // Required only if Type is 'Folder'
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
