---
title: Automating Project Maintenance on Github

description: Know about the Maintenance stack we use at RavSam to keep our projects updated and secure.

date: 2021-05-03 08:30:00 +00:00

tags: [github,bots,automation]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/automating-project-maintenance-on-github/
---

### Contents

*   [Manual Maintenance is tough and boring](#manual-maintenance-is-tough-and-boring)
*   [Renovate - Automated Dependency Updates](#renovate---automated-dependency-updates)
*   [Imgbot - Automated Image Optimization](#imgbot---automated-image-optimization)
*   [RavSam Bot - A Github Probot App](#ravsam-bot---a-github-probot-app)

Manual Maintenance is tough and boring
--------------------------------------

Most of the effort in the software business goes into the maintenance of the code that already exists. Once the software is built, many factors affect its performance over time. We need to fix bugs, address security vulnerabilities, make performance improvements, and decrease technical debt.

Managing a single piece of software is easy but as a developer, we often have to deal with more than one. And this is exactly where maintenance gets hard. The best way to handle **Maintenance debt** is to upgrade the dependencies on which our project depends regularly.

All these problems can be solved by automation. We at RavSam use [Github](http://github.com/ravsamhq) for our code handling and CI/CD purposes. There are tools like Github Apps and Github Actions that allow us to automate our software maintenance.

Renovate - Automated Dependency Updates
---------------------------------------

[Renovate](https://github.com/marketplace/renovate) is one of those packages that make our idea of automated maintenance a reality. It is a free, open-source, customizable Github app that helps us to automatically update our dependencies in software projects by receiving pull requests and that too for [multiple languages](/our-platforms).

![Dependency Updates by Renovate](https://www.ravsam.in/assets/images/blog-assets/renovate-bot.png)

Dependency Updates by Renovate

The best part is that we can write a single config and use it for all of our projects in our Github organization. Here is a config that we use at RavSam:

```
{
  "extends": ["config:base"],
  "labels": ["dependencies"],
  "major": {
    "enabled": false
  },
  "packageRules": [
    {
      "matchUpdateTypes": ["patch", "pin", "digest"],
      "automerge": true
    }
  ],
  "prCreation": "not-pending",
  "schedule": ["every weekend"],
  "stabilityDays": 3
}
```

We have configured Renovate to run only on weekends to prevent noise and distractions. We have enabled auto-merge when the update type is one of the following: *patch*, *pin* or *digest*.

Imgbot - Automated Image Optimization
-------------------------------------

The performance of a Web App is often dependent on the images. Hence it is crucial to optimize images or else lose customers. Another advantage of optimized images is that it reduces the bandwidth costs for us as well as our visitors.

We love [Imgbot](https://github.com/marketplace/imgbot). It optimizes the images and creates a pull request against our default branch. Imgbot is verified by GitHub which means there is no point worrying about the security.

![Images optimized by ImgBot](https://www.ravsam.in/assets/images/blog-assets/imgbot.png)

Images optimized by ImgBot

RavSam Bot - A Github Probot App
--------------------------------

We have built our custom serverless Github Probot, [RavSam Bot](https://github.com/apps/ravsam-bot), our employee #1. It helps us automate various tasks like managing issues by raising their priority, assigning confirmed issues to developers, assigning reviewers to the pull requests, auto-merging them once the changes have been approved and many more things.

![Approved pull request merged by RavSam Bot](https://www.ravsam.in/assets/images/blog-assets/ravsam-bot.png)

Approved pull request merged by RavSam Bot

Probot apps are easy to write, deploy, and share. We have deployed our app on Netlify Functions and it spends the entire day doing mundane tasks for us tirelessly.
    