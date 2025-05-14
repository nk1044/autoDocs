# Git Basics

Git is a distributed version control system that helps developers track changes in their codebase. It follows a flow:
Workdir → `git add` → Staging Area → `git commit` → Repository → `git push` → Remote (e.g., GitHub).

```bash
# Initialize a new repository
git init

# Check the status of the repository
git status

# Add files to staging area
git add .

# Commit changes with a message
git commit -m "Initial commit"

# View commit history (compact view)
git log --oneline
```

# Git Branching and Merging

Git allows working on different features using branches. Branching helps maintain a clean development workflow.

| Command                                      | Description                       |
| -------------------------------------------- | --------------------------------- |
| `git branch`                    | List all branches                 |
| `git branch \<branch\_name>`    | Create a new branch               |
| `git switch \<branch\_name>`    | Switch to an existing branch      |
| `git switch -c \<branch\_name>` | Create and switch to a new branch |
| `git merge \<branch\_name>`     | Merge a branch into the current   |
| `git merge --abort`             | Abort a merge conflict            |
| `git branch -d \<branch\_name>` | Delete a branch                   |

```bash
# Create and switch to a new branch
git branch feature-branch
git switch feature-branch

# Merge feature-branch into main
git switch main
git merge feature-branch

# Delete a branch after merging
git branch -d feature-branch
```

# Git Stash and Temporary Changes

Git Stash helps in saving unfinished work temporarily so that you can switch branches or work on urgent changes.

* `git stash` - Save uncommitted changes
* `git stash save "message"` - Save with a message
* `git stash list` - View all stashes
* `git stash pop` - Apply the most recent stash and remove it
* `git stash drop` - Remove the most recent stash
* `git stash apply stash@{0}` - Apply a specific stash
* `git stash clear` - Remove all stashes

```bash
# Stash changes before switching branches
git stash save "WIP: Fixing UI issue"

# View all stashes
git stash list

# Apply and remove stash
git stash pop
```

# Git Rebase and Reset

Rebasing helps keep the commit history clean, while reset allows reverting to a previous state.

| Command                                         | Description                               |
| ----------------------------------------------- | ----------------------------------------- |
| `git rebase \<branch\_name>`       | Rebase current branch onto another branch |
| `git reset --hard \<commit\_hash>` | Reset repository to a specific commit     |
| `git reflog`                       | View commit history with references       |
| `git reflog <commit-hash>`         | Show changes of a specific commit         |

```bash
# Rebase feature branch onto main
git switch feature-branch
git rebase main

# Reset repository to a previous commit
git reset --hard abc1234
```

# GitHub Repository Setup

When creating a new repository on GitHub, use the following template to initialize and push your project.

```bash
echo "# my-repo" >> README.md
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/username/myrepo.git
git push -u origin main
```

## Git Best Practices 

1. Always write meaningful commit messages.
2. Use feature branches for development.
3. Keep the main branch clean and stable.
4. Pull the latest changes before pushing your code.
5. Use `git rebase` instead of `git merge` to maintain a linear history.
6. Regularly push code to avoid losing progress.