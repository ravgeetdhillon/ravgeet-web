---
title: Script as a Task using VS Code IDE

description: Convert NPM, Bash scripts to VS Code tasks and run them from anywhere.

date: 2021-06-17 14:10:00 +00:00

tags: [bash,vscode,productivity,automation]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/script-as-a-task-using-vs-code-ide/
---

VS Code comes with a great feature of specifying *tasks* and running them through **Command Palette**. There can be a variety of scripts that we need to run while developing our applications. For example, before releasing a new build, there are a lot of things that need to be done by the release team. Some of them include bumping release version, creating release notes, generating changelog and the list goes on.

In this tutorial, we will learn how to use VS Code Tasks by taking the example of pre-release commands and ensure that no step is missed along the way.

### Contents

*   [Prerequisites](#prerequisites)
*   [1\. Writing Pre Release Script](#1-writing-pre-release-script)
*   [2\. Setting Tasks](#2-setting-tasks)
*   [3\. Running Tasks](#3-running-tasks)
*   [Conclusion](#conclusion)

Prerequisites
-------------

*   A Local Git Repository
*   VS Code Editor
*   Linux Environment

1\. Writing Pre Release Script
------------------------------

The first thing we need to do is to create a script - in this case, a *bash* script. In this script, we will define what steps we need to perform as a part of our pre-release operation.

Let us assume that before releasing, we do two operations. First, we create a `.version` file and add today’s date to it. Then we create an empty commit with a message - *do-production-release*.

With the steps determined, let us create a `pre-release.sh` in `.vscode` directory and add the following code:

```
#!/bin/sh

date > .version
git commit --allow-empty -m "do-production-release"
```

We can test run the above script by doing:

```
bash .vscode/pre-release.sh
```

> Make sure to give proper permissions to the script before running it.

2\. Setting Tasks
-----------------

Now comes the most interesting part of the tutorial. VS Code allows us to specify tasks in `tasks.json`. The beauty of the VS Code tasks is that we can run them directly from VS Code Command Palette which is especially helpful for non-technical members of our team.

Let us create a `tasks.json` file in `.vscode` directory and add the following contents in the file:

```
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Pre-Release Setup",
            "type": "shell",
            "command": "bash",
            "args": ["${workspaceFolder}/.vscode/pre-release.sh"]
        }
    ]
}
```

It is important to understand what we are doing so that we can customize the workflow according to our needs.

*label* is used to identify the script in the VS Code Command Palette.

```
"label": "Pre-Release Setup"
```

*type* is set to *shell* since you need to execute a shell script.

```
"type": "shell"
```

*command* is used the specify the base command to which the arguments can be passed.

```
"command": "bash"
```

*args* is an array that provides arguments to the *command*. `${workspaceFolder}` is the internal variable provided by the VS Code. It is the absolute path to our project’s root directory.

```
"args": ["${workspaceFolder}/.vscode/pre-release.sh"]
```

3\. Running Tasks
-----------------

Let us open the VS Code Command Palette using Ctrl + Shift + P, type `Tasks: Run Task` and press *Enter*.

![VS Code Command Palette to run tasks](https://www.ravsam.in/assets/images/blog-assets/vscode-run-task.png)

We will be presented with a list of tasks that we specified in the `tasks.json`. We will select the `Pre-Release Setup` and press *Enter*. We will see the task output in VS Code Integrated Terminal.

![VS Code Command Palette to select tasks](https://www.ravsam.in/assets/images/blog-assets/vscode-select-task.png)

Conclusion
----------

We now have a good overview of how we can use VS Code tasks to run our *scripts as tasks* in a better way. We can also add more tasks like running *pre-staging release*, running *pre-dev release* and more.
    