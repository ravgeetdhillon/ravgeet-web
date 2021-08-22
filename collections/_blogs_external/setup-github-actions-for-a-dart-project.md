---
title: Setup Github Actions for a Dart project

description: Format, Static Analyse, and Test a Dart project using Github Actions.

date: 2021-03-27 10:00:00 +00:00

tags: [github-actions,dart,flutter,automation]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/setup-github-actions-for-dart-project/
---

When working in a team or even as an individual, we humans often break rules. But sometimes breaking rules can result in a poor quality code which over time grows out to be messy. We can take advantage of linting and static analysis to check whether the written code adheres to our code styling rule. This can be automated using Github Actions. In this blog, we will see how we can set up Github Actions workflows for static analyzing our code before merging it with our production codebase.

### Contents

*   [Prerequisites](#prerequisites)
*   [1\. Basic Analysis Options](#1-basic-analysis-options)
*   [2\. Setting up Github Actions](#2-setting-up-github-actions)
*   [Results](#results)

Prerequisites
-------------

Before getting started, we assume that we have set up the following:

*   [A Sample Dart Project](https://github.com/ravgeetdhillon/dart_shelf_server_sample)

1\. Basic Analysis Options
--------------------------

Static analysis helps us to find problems before executing a single line of code. It’s a great tool that we can integrate into our development environment to prevent bugs and ensure that code conforms to style guidelines especially when we are working with a team. `analysis_options.yaml` is a YAML file that we can use to specify the lint rules. Below is a basic example with minimum configuration:

```
# Defines a default set of lint rules enforced for
# projects at Google. For details and rationale,
# see https://github.com/dart-lang/pedantic#enabled-lints.
include: package:pedantic/analysis_options.yaml

# For lint rules and documentation, see http://dart-lang.github.io/linter/lints.
# Uncomment to specify additional rules.
linter:
  rules:
    - camel_case_types

analyzer:
  exclude:
    - path/to/excluded/files/**
```

2\. Setting up Github Actions
-----------------------------

Let us now create a Github Actions workflow for doing a static analysis of our project’s source code and even run some tests. This workflow will run on each push and pull request made to the master branch. Let us create a `ci.yml` file in the `.github/workflows/` directory and the following code:

```
name: CI

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Setup Repository
        uses: actions/checkout@v2
      
      - name: Setup Dart
        uses: dart-lang/setup-dart@v1

      - name: Install Pub Dependencies
        run: dart pub get

      - name: Verify Formatting
        run: dart format --output=none --set-exit-if-changed .

      - name: Analyze Project Source
        run: dart analyze
      
      - name: Run tests
        run: dart test
```

The above steps are pretty self-explanatory. We are using a *stable* version of Dart. However, if we want to set up different Dart configuration, we can use ***sdk*** input with *dart-lang/setup-dart* action.

```
- name: Setup Dart
  uses: dart-lang/setup-dart@v1
  with:
    sdk: 2.10.3

- name: Setup Dart
  uses: dart-lang/setup-dart@v1
  with:
    sdk: dev
```

Results
-------

We can make a push directly to the master branch and check out the result for our Github Action.

![Github Actions for Dart](https://www.ravsam.in/assets/images/blog-assets/dart-github-actions.png)

All steps passed successfully

So, we can see that we have been able to set up our **lint pipeline** in less than two minutes. This power of Github Actions can help any team to achieve better developer workflow and faster releases.
    