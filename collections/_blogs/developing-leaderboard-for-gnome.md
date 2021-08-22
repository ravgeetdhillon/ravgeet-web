---
title: Developing Leaderboard for GNOME Hackers

description: A brief blog about the functioning of the leaderboard app for GNOME hackers.

date: 2019-12-09 21:00:00 +0530

tags: [gnome, leaderboard, python]

canonical_details:
  site:
  url:
---

After completing my [Google Summer of Code assignment](/blog/final-report-gsoc-2019/), I had an idea in my mind for a project where the hard-working people on GNOME, known as GNOME Hackers, could be appreciated based on the amount of work they do for the FLOSS community. In the quest for the same, I wrote a leaderboard web app, [GNOME Hackers](https://gnome-hackers.netlify.com/). It was an awesome experience and I utilized my weekends very well by learning many new things. I will give a brief of them below.

## Gitlab API

All of the GNOME groups and projects are hosted on the [Gitlab instance of GNOME](http://gitlab.gnome.org/). The most typical activities that happen on Gitlab are **commits**, **issues** and **merge requests**. These form the basis for scoring that builds up the leaderboard. The data is fetched from the [Gitlab Instance of GNOME](https://gitlab.gnome.org/) using the [Python wrapper for Gitlab API](https://github.com/python-gitlab/python-gitlab/).

## Static Website

![Landing page for GNOME Hackers :c-shadow](/assets/images/blog/gnome-hackers-main.jpg)

To create a static website, I could have used any Static Site Generator such as Jekyll. But this website required some logic such as scoring, selecting top hackers, giving them awards, etc., so I settled for Python. I used [Frozen Flask](https://pythonhosted.org/Frozen-Flask/) to freeze the website into a static website which could then be hosted on Netlify. This great library reduced the codebase and gave me the power to build the website based on [JAMstack](https://jamstack.org/).

## Scoring

For allocating points and building up the leaderboard, the script uses the following scheme, If you feel that a rule is biased against the others, you can open an [issue](https://github.com/ravgeetdhillon/gnome-hackers/issues) and we will have a conservation regarding the same.

| Event                | Points |
| -------------------- | ------ |
| Each line of commit  | 0.01   |
| Opened Merge Request | 5      |
| Closed Merge Request | 10     |
| Opened Issue         | 1      |
| Closed Issue         | 2      |

## Awards

The script gives you awards for staying on the leaderboard. You can get four types of awards:

* Gold
* Silver
* Bronze
* Top 10

For each day spent on the leaderboard, the hacker gets a **+1** for an award, which he/she is eligible for.

## GitHub Actions

Since I have a GitHub Pro pack, I get free 3000 build mins for GitHub Actions, which is an effective tool to automate the tasks. The [workflow](https://github.com/ravgeetdhillon/gnome-hackers/actions) is simple and clearly explained by the graphic below.

![Workflow for GNOME Hackers :c-shadow](/assets/images/blog/gnome-hackers-workflow.jpg)

The website builds every day at 00:00 UTC. After the workflow is executed successfully, the website build is pushed to the [`website`](https://github.com/ravgeetdhillon/gnome-hackers/tree/website) branch, which triggers a deploy script on the [Netlify](https://app.netlify.com/sites/gnome-hackers/deploys) and publishes the website accordingly.

## Personal Page

![Personal Profile page for GNOME Hackers :c-shadow](/assets/images/blog/gnome-hackers-personal-profile.jpg)

## Links

* GNOME Hackers: [https://gnome-hackers.netlify.com/](https://gnome-hackers.netlify.com/)
* GitHub Repository: [https://github.com/ravgeetdhillon/gnome-hackers](https://github.com/ravgeetdhillon/gnome-hackers)

## What's next

If you liked by work, you can appreciate the same by [buying me a cup of coffee](https://www.buymeacoffee.com/ravgeetdhillon). Also, I was given GNOME Membership, while I was working on this project. It made me feel so happy and I want to thank [GNOME](https://gnome.org/) for all the support. For this website, I am looking forward to new ideas that I can implement on the website to make it even more interesting. If you liked my project, I would love you to [star it](https://github.com/ravgeetdhillon/gnome-hackers) as well. These little things encourage me to work further.

Lemme know if you have any doubt, appreciation or anything else that you would like to communicate to me. You can tweet me [@ravgeetdhillon](https://twitter.com/intent/tweet?screen_name=ravgeetdhillon&original_referer={{ page.url }}&ref_src=twsrc%5Etfw). I reply to all the questions as quickly as possible. 😄 And if you liked this post, please [share](https://twitter.com/intent/tweet?text={{ 'Check out this amazing blog post by Ravgeet Dhillon sharing his thoughts on ' | append: page.title | urlencode }}&screen_name=ravgeetdhillon&original_referer={{ page.url }}&ref_src=twsrc%5Etfw) it with your twitter community as well.
