---
title: Send Slack notification when Github Actions fails

description: We can easily monitor our Github Actions status by sending success or failure notifications to our Slack channel.

date: 2020-09-13 07:50:00 +00:00

tags: [slack-bot,github-actions,automation]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/send-slack-notification-when-github-actions-fails/
---

We must be sure that if you and your team use Github, then you must using Github Actions as well. When a Github Action fails, Github automatically sends you an email regarding the event. It works only if you are working on an individual project. However, when we are working in a team, we need a better way to monitor our Github Actions. We need to know the status of our Github Actions specifically when they fail so that our development team can act upon them as quickly as possible.

We faced this issue often at our workspace. So our team decided to publish a new Github Action that can be used effectively to notify our Slack channel whenever our Github Action fails.

### Contents

*   [1\. Get a Webhook URL](#1-get-a-webhook-url)
*   [2\. Use notify-slack-action](#2-use-notify-slack-action)
*   [Results](#results)

1\. Get a Webhook URL
---------------------

To send notifications to our Slack channel, we need to create a Slack App. We can follow this [easy tutorial](/blog/collect-form-responses-using-google-apps-script/) that includes tips on how can we create our own Slack App and get a webhook URL. Once we have a webhook URL, we need to add it to the Github Actions secrets with the name *ACTION\_MONITORING\_SLACK*

2\. Use notify-slack-action
---------------------------

We assume that we already have a Github Action that fails often and we need to monitor it. Add the above the following step in the Github Action workflow:

```
- name: Report Status
  if: always()
  uses: ravsamhq/notify-slack-action@master
  with:
    status: ${{ job.status }}
    notify_when: 'failure'
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.ACTION_MONITORING_SLACK }}
```

You can find and read more about the action at [Github Marketplace](https://github.com/marketplace/actions/notify-slack-action).

That’s it. This is all we need to monitor our Github Actions workflow. If we want to monitor each run of our Github Action workflow even when it succeeds, we can simply change the `notify_when` parameter value to *success,failure,warnings*.

Results
-------

We will fail our Github Action deliberately to test our Github Actions monitoring.

![Failed Github Actions run](https://www.ravsam.in/assets/images/blog-assets/github-action-failed.png)

Failure notification recieved in Slack

![Failure notification in Slack](https://www.ravsam.in/assets/images/blog-assets/slack-failure-notification.png)

Failure notification recieved in Slack

Alright! We can see that a notification message was sent to our Slack channel stating the commit and repository it failed in. This is extremely useful when we have multiple projects using Github Actions and we want to keep a check on our Github Actions workflow.

We strongly feel that this action will increase the productivity of any team at any workspace. If you any doubts or appreciation for our team, let us know in the comments below.
    