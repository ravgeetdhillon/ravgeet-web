---
title: Send an Email notification when Github Actions fails

description: Send a custom email notification to multiple recipients when a Github Actions workflow fails or succeeds.

date: 2020-12-03 09:40:00 +00:00

tags: [email,github-actions,automation]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/send-email-notification-when-github-action-fails/
---

We recently published a blog on [how to send a slack notification when a github action fails](/blog/send-slack-notification-when-github-actions-fails/). We got a great response from the open-source community. Some of the community members asked us about how they can send an email notification when a Github Action fails. So to take in the request, today we will see how we can build a workflow that allows us to achieve this purpose.

Github has this feature natively that sends an email when a Github Action fails. It works efficiently when you are working on an individual project. However, when working in a team, we often want to notify more than one team member about the possible failure of the workflow.

### Contents

*   [1\. Create a sample workflow](#1-create-a-sample-workflow)
*   [2\. Add Send Email Action](#2-add-send-email-action)
*   [Results](#results)

1\. Create a sample workflow
----------------------------

Let us write a simple workflow that prints the infamous *Hello World*. Create a new file *build.yml* in *.github/workflows* directory and add:

```
name: Build

on:
  push:
    branches: main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Hello World
        run: echo Hello, world!
```

![Github Action executed successfully](https://www.ravsam.in/assets/images/blog-assets/github-action-success.png)

Github Action executed successfully

2\. Add Send Email Action
-------------------------

[Dawid Dziurla](https://github.com/dawidd6/action-send-mail) has published a Github action that allows us to configure a lot of aspects related to sending the emails. We just need to add the below step to our workflow:

```
- name: Send mail
  if: always()
  uses: dawidd6/action-send-mail@v2
  with:
    # mail server settings
    server_address: smtp.gmail.com
    server_port: 465
    # user credentials
    username: ${{ secrets.EMAIL_USERNAME }}
    password: ${{ secrets.EMAIL_PASSWORD }}
    # email subject
    subject: ${{ github.job }} job of ${{ github.repository }} has ${{ job.status }}
    # email body as text
    body: ${{ github.job }} job in worflow ${{ github.workflow }} of ${{ github.repository }} has ${{ job.status }}
    # comma-separated string, send email to
    to: johndoe@gmail.com,doejohn@gmail.com
    # from email name
    from: John Doe
```

> Use `echo "${{ toJson(github) }}"` to get more workflow context variables.

The `if: always()` directive tells the Github Actions to always run this step regardless of whether the preceding steps have been executed successfully or not. We use the workflow’s context variables to build our email subject and body. Don’t forget to add your *username* and *password* as Action secrets.

> Make sure to use **App-Specific** password for the above action. Learn how to [create an app-specific password for GMail](https://support.google.com/mail/answer/185833?hl=en-GB).

Results
-------

Before testing the action in use, let us deliberately fail the action. All we need to do is update the *Hello World* step’s run command to `echo Hello, world! && exit 1`. *exit 1* sets an exit status of 1 which tells the Github Actions that some kind of error has occurred. Let push our code and see what happens.

![Github Actions workflow failed deliberately](https://www.ravsam.in/assets/images/blog-assets/failed-github-action.png)

Github Actions workflow failed deliberately

From the above screenshot, we can see that the *Send mail* step was executed even though the previous step failed. Let us check our inbox for the email about the failure.

![Email Notification sent about failed Github Action](https://www.ravsam.in/assets/images/blog-assets/email-notification.png)

Email Notification sent about failed Github Action

Sweet! We can see that email notification was sent to our recipients. The subject and body were populated with the appropriate repository and workflow.

Github Actions is a great CI/CD tool. By using the right actions, we can build workflows that help in boosting team productivity at any workspace. If you any doubts or appreciation for our team, let us know in the comments below.
    