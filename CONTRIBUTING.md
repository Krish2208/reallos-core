# Contributing Guidelines

These set of guidelines are meant to improve code quality (in terms of readability and consistency) and make workflow efficient. 😊

## Things to consider

- Make sure to format the code properly. (You can use [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode))
- Class names in CSS should be specific so that it is less ambiguous and less prone to class name conflicts. One trick would be to **prefix the class names with component name** (like, instead of `.heading` for modal, `.modal-heading` could be used).
- Assets and Component names should be straight-forward.
- Make sure to add spaces between different tokens. For example, instead of `x=y+1`, use `x = y + 1`.
- Omit spaces when passing data as props or when passing any values as arguments to a class/function. For example, `<Component prop={someVariable}>`
- Use camel casing within JavaScript source files wherever possible.
- Do add a line break at the end of files.

## Workflow Guidelines

> If you use fork of this project. You may want to refer to the following.

1. Fork the project.
2. Clone the fork on your machine.
3. Open Command Prompt/Terminal in this directory.
4. Type `git remote add upstream https://github.com/Akshat-sharma-21/reallos-core.git`. (_This is just a one-time thing_)
5. _Make changes to your code._
6. Run `git fetch upstream master`
7. Then, `git merge upstream/master`
8. For the most part _Step 7_ will automatically merge all the changes from upstream. If it doesn't, it will give you Merge Conflict error wherein you need to manually resolve those conflics. You can use VSCode to resolve any such merge conflics if they exist.
9. Finally, make a pull request from your fork to this Repository.

**PS:** You mostly have to deal with steps 6 through 9 most of the time.
