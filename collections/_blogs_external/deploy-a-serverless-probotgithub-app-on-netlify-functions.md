---
title: Deploy a Serverless Probot/Github App on Netlify Functions

description: Build and Deploy a Serverless Probot or Github App on Netlify Functions to automate your Github and achieve infinite scalability.

date: 2021-04-19 08:10:00 +00:00

tags: [github-bot,netlify,automation]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/deploy-a-serverless-probot-github-app-on-netlify-functions/
---

Automation is love. We all love automating repetitive things. There is one such thing called Probot. [Probot](https://probot.github.io/) is one of the most popular frameworks for developing GitHub Apps using Javascript. It is easy to set up as most of the things like setting up authentication, registering webhooks, managing permissions, are all handled by Probot itself. We just need to write our code for sending responses to [different events](https://docs.github.com/en/free-pro-team@latest/developers/webhooks-and-events/webhook-events-and-payloads).

In this article, we will learn how we can build a serverless bot and deploy it to Netlify Functions. The advantage of using Netlify Functions is that it is *free* for up to 125,000 requests per month which is more than enough for a small startup or organization.

### Contents

*   [Prerequisites](#prerequisites)
*   [1\. Writing Application Logic](#1-writing-application-logic)
*   [2\. Deploying on Netlify Functions](#2-deploying-on-netlify-functions)
*   [3\. Updating Webhook URL](#3-updating-webhook-url)
*   [Results](#results)

Prerequisites
-------------

We can follow this [guide on how to set up Probot](https://probot.github.io/docs/development/).

1\. Writing Application Logic
-----------------------------

Once our Probot is set up, we need to do some changes to our directory structure to deploy it to Netlify Functions.

Let us create an `src` directory and put our application logic in a new file, `app.js`:

```
/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

module.exports = (app) => {
  app.log.info('App has loaded');

  app.on('issues.opened', async (context) => {
    context.octokit.issues.createComment(
      context.issue({
        body: 'Thanks for opening this issue!',
      })
    );
  });
};
```

The above code is really simple. Whenever a new issue is opened, it creates an issue comment thanking the issue author.

Netlify Functions are AWS Lambda functions but their deployment to AWS is handled by Netlify. For deploying our Probot on Netlify, we can use AWS Lambda adapter for Probot.

```
npm install @probot/adapter-aws-lambda-serverless --save
```

The next thing we need to do is to create a `functions` directory that will be used by Netlify to deploy our serverless functions. Every *JS* file in the `functions` directory is deployed as an individual function which can be accessed via `<domain>/.netlify/functions/<function_name>`.

In `functions` directory, let us create a `index.js` file and add the following code:

```
const { createLambdaFunction, createProbot } = require('@probot/adapter-aws-lambda-serverless');
const app = require('../src/app');

module.exports.handler = createLambdaFunction(app, {
  probot: createProbot(),
});
```

Our code is finally done and the next step is to deploy our application to Netlify.

2\. Deploying on Netlify Functions
----------------------------------

Before proceeding with setup for deployment, we need to address some issues. We need to create a configuration file, `netlify.toml` at the root of the project and tell some important things for Netlify to consider when deploying our bot.

Let us add the following content in `netlify.toml`:

```
[build]
command = "npm install --production"
functions = "./functions"
```

We are telling Netlify to run `npm install` before deploying our functions which are present in the `functions` directory.

To deploy on Netlify, we can use [Netlify Dev](https://www.netlify.com/products/dev/). For that we need to install `netlify-cli` by doing:

```
npm install netlify-cli -g
```

Let us now login to our Netlify account by doing:

```
netlify login
```

Once we are logged in, let us connect our current directory to Netlify Functions. We can either connect to an existing one or create a new one by doing:

```
netlify init
```

Once our site is connected, we can build our site locally and deploy it to Netlify by doing:

```
netlify build
netlify deploy --prod
```

> We can also connect our Github Repository to our Netlify project or [use Github Actions to deploy our bot to Netlify](/blog/deploy-a-website-on-netlify-through-github-actions). {.alert alert-info}

3\. Updating Webhook URL
------------------------

Once our Probot is deployed, we need to update the **Webhook URL** to tell Github where to send the event payloads. We can visit `[https://github.com/settings/apps/<app-name>](https://github.com/settings/apps/<app-name>)` and update the Webhook URL with our Netlify website URL.

Results
-------

Let us test our bot by creating an issue on a repository where we installed our Github app and see whether our bot responds back or not.

![Setting up our master branch on Github](https://www.ravsam.in/assets/images/blog-assets/github-probot-netlify-functions.png)

Setting up our master branch on Github

Awesome! We can see that our bot welcomed us with a message that we wrote earlier. There are many things to automate on Github like auto assigning users to the issues, auto assigning reviewers to a pull request, auto merging pull requests created by dependabot alerts and much more.
    