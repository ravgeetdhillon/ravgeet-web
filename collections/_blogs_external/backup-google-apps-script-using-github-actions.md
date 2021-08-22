---
title: Backup Google Apps Script using Github Actions

description: We can use Github Actions to set up an automated backup of Google Apps Scripts to Github.

date: 2020-08-15 08:30:00 +00:00

tags: [github-actions,google-apps-script,automation]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/backup-google-apps-script-using-github-actions/
---

Google Apps Scripts are amazing. Without setting any servers, we can do a lot of things like [collecting form responses](https://www.ravsam.in/blog/collect-form-responses-using-google-apps-script/), email marketing campaigns, etc. But as a developer, we like our code to be on Version Control System like Github. In this blog, we will discuss how can you setup Github Actions to automatically backup your Google Apps Scripts to Github.

### Contents

*   [Prerequisites](#prerequisites)
*   [1\. Installing Clasp](#1-installing-clasp)
*   [2\. Creating a new Repository](#2-creating-a-new-repository)
*   [3\. Adding important files](#3-adding-important-files)
*   [4\. Setting up Github Actions](#4-setting-up-github-actions)
*   [5\. Adding Github Actions Secrets](#5-adding-github-actions-secrets)
*   [Results](#results)

Prerequisites
-------------

Before getting started, we assume that you have set up the following:

*   A Google Apps Script Project
*   A Github Account

1\. Installing Clasp
--------------------

[Clasp](https://github.com/google/clasp) is a Google tool to develop Apps Script projects locally. It is short for **Command-Line Apps Script Projects**. Setting up Clasp is simple. Follow this [amazing guide](https://github.com/google/clasp#readme) by Google to get your login credentials, which we will be using later while setting up Github Actions.

Once you have successfully logged in, use the following command to get the content of the credentials file.

```
cat ~/.clasprc.json
```

2\. Creating a new Repository
-----------------------------

Depending upon your requirement, create a new public/private repository at [Github](https://repo.new). Once you have created a new repository, add a .gitignore file with the following content:

```
.*.json
```

This prevents our credential file to be committed back to the repository.

3\. Adding important files
--------------------------

Now it’s time to add some new files to the repository.

a.) **setup.sh**

This script will prevent us from logging in again by using our already logged in credentials from Github Actions secrets, which we will be setting up later. Add the following bash code to the file:

```
#!/bin/sh

LOGIN=$(cat <<-END
    {
        "token": {
            "access_token": "$ACCESS_TOKEN",
            "refresh_token": "$REFRESH_TOKEN",
            "scope": "https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/service.management https://www.googleapis.com/auth/script.deployments https://www.googleapis.com/auth/logging.read https://www.googleapis.com/auth/script.webapp.deploy https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/script.projects https://www.googleapis.com/auth/drive.metadata.readonly",
            "token_type": "Bearer",
            "id_token": "$ID_TOKEN",
            "expiry_date": 1595752666211
        },
        "oauth2ClientSettings": {
            "clientId": "$CLIENT_ID",
            "clientSecret": "$CLIENT_SECRET",
            "redirectUri": "http://localhost"
        },
        "isLocalCreds": false
    }
END
)

echo $LOGIN > ~/.clasprc.json
```

Replace the `scope` key value with value in your `~/.clasprc.json`.

b.) **scripts.json**

This script will contain the **id** and **name** of the Google Apps Script projects. We can add single or multiple projects here depending upon our backup strategy. Add the following JSON object to the file:

```
[
    {
        "id": "google-apps-script-project-id",
        "name": "google-apps-script-project-name"
    },
    {
        "id": "google-apps-script-project-id",
        "name": "google-apps-script-project-name"
    }
]
```

c.) **clone.sh**

This script will use clasp’s **clone** command to download all the scripts that we provide in the `scripts.json` file. This script will delete all the previous projects committed in the repository. This is an important step to reflect the deleted files in the Github. Add the following bash code to the file:

```
#!/bin/sh

# remove all the pre-existing projects
rm -r -f */

content=$(cat scripts.json)
for row in $(echo "${content}" | jq -r '.[] | @base64'); do
    _jq() {
      echo ${row} | base64 --decode | jq -r ${1}
    }

    # get name and id for project
    name=$(_jq '.name')
    id=$(_jq '.id')

    # create a project directory
    mkdir $name
    cd $name

    # clone the project using the clasp
    clasp clone $id

    # come out of the directory
    cd ..
done
```

4\. Setting up Github Actions
-----------------------------

Now comes the best part of the project. We will automate the whole backup process using Github Actions. We will schedule the script to run every midnight using Cron job syntax. The workflow setups the repository, installs Node, installs Clasp, runs Clasp Setup, clones the Google Apps Scripts, checks whether new changes are present, and commits them back to the repository as required with a pre-defined commit message.

```
name: Backup

on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  backup:
    runs-on: ubuntu-latest

    env:
      ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
      REFRESH_TOKEN: ${{ secrets.REFRESH_TOKEN }}
      CLIENT_ID: ${{ secrets.CLIENT_ID }}
      CLIENT_SECRET: ${{ secrets.CLIENT_SECRET }}
      ID_TOKEN: ${{ secrets.ID_TOKEN }}
      REMOTE_BRANCH: master

    steps:
      - name: Setup repository
        uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v1
        with:
          node-version: '12'

      - name: Install Clasp
        run: npm install -g @google/clasp

      - name: Install jq
        run: |-
          sudo apt update -y
          sudo apt install jq -y

      - name: Setup Logins
        run: bash setup.sh

      - name: Clone Scripts
        run: bash clone.sh

      - name: Update Progress
        run: |
          if [ $(git status --porcelain=v1 2>/dev/null | wc -l) != "0" ] ; then
            git config --global user.email ${GITHUB_ACTOR}@gmail.com
            git config --global user.name ${GITHUB_ACTOR}
            git add .
            git commit -m "github-actions: took backup"
            git push --force https://${GITHUB_ACTOR}:$@github.com/${GITHUB_REPOSITORY}.git HEAD:${REMOTE_BRANCH}
          fi
```

5\. Adding Github Actions Secrets
---------------------------------

We can get our Action Secrets values from the `~/.clasprc.json` and add them accordingly.

![Setting up Github Actions Secrets](https://www.ravsam.in/assets/images/blog-assets/github-secrets.png)

Setting up Github Actions Secrets

Results
-------

Hurray! We can see that the Github Action workflow completed successfully at 00:00 UTC.

![Scheduled Actions workflow completed successfully](https://www.ravsam.in/assets/images/blog-assets/github-actions.png)

Scheduled Actions workflow completed successfully

Let us check our repository to confirm that the backup was taken successfully.

![Backup taken successfully to Google Apps Script](https://www.ravsam.in/assets/images/blog-assets/google-apps-script-github-repo.png)

Backup taken successfully to Google Apps Script

We can see that the Google Apps Scripts projects were committed back to our repository with a commit message *github-action: took backup*. Using this workflow, we can stay connected with both Google Apps Script and Github. If you any doubts or appreciation for our team, let us know in the comments below.
    