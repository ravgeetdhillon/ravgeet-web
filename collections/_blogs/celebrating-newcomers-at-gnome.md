---
title: Celebrating GNOME Newcomers' contributions

description: Find out how we identify and celebrate the newcomer contributions at GNOME.

date: 2020-01-02 18:30:00 +0530

tags: [gnome, gnome-newcomers]

canonical_details:
  site:
  url:
---

A few weeks ago, I sat down to solve some issues related to the GNOME Engagement team. While going through the list, I found [this issue](https://gitlab.gnome.org/Teams/Engagement/General/issues/8) created by Umang Jain, which looked forward to celebrating the contributions made by GNOME Newcomers. It was opened in late 2017 and a lot of discussions happened during this period. So, I decided to take on this issue and solve it programmatically.

## Problem

There is no doubt that newcomers work hard to make their first contribution to a project they do not know about. So, it's really important to recognize and celebrate their contributions when they make one.

With GNOME being a large project, there is a need for an automated system which recognizes the contributions made by the newcomers and help the GNOME Engagement team to seamlessly identify them.

The following points were listed on the issue which we need to solve, but I will only consider solving the relevant ones.

* Come up with an easy way for maintainers to indicate when a newcomer has made their first contribution
* Create/decide twitter account and a person responsible for handling that
* Create a way for the Engagement team to broadcast these achievements regularly on social media (e.g. monthly shout-out?)
* Announce the new plan to key stakeholders (maintainers), and the larger GNOME community 

## Approach

Many GNOME people proposed there views and workarounds to tackle this problem. Taking the best cues out of each suggestion, I decided to use the Gitlab API. Gitlab API has all the features which can help us to take on this problem effectively.

Using Gitlab API, a list of all the users(with their first ten contributions) present on [GNOME Gitlab Instance](https://gitlab.gnome.org/), is fetched. Along with this, a list of projects is also fetched using Gitlab API. The list of users is traversed which divides the users into **Newcomers** and **Regular contributors**. This is achieved by checking when the user first contributed to a GNOME project. If the contribution was made in the last 15 days, then the contributor is categorized as a **Newcomer**. After the newcomers are identified, they are filtered based on the type of contribution made. Currently, notable contributions are related to merge requests and issues.

After going through the above procedure, a detailed report is created as a JSON file. This JSON file can be found [here](https://gitlab.gnome.org/ravgeetdhillon/newcomers-shoutout/blob/master/src/data/contributions.json).

## Scheduling scan

The above process is scheduled to run once a day using Gitlab CI. It takes about 5 hours to complete. Once the scan is completed, the result of this whole process is pushed back to the project repository for future use.

## Resources

You can find out the project [here](https://gitlab.gnome.org/ravgeetdhillon/newcomers-shoutout). You can also [open issues](https://gitlab.gnome.org/ravgeetdhillon/newcomers-shoutout/issues) and [merge requests](https://gitlab.gnome.org/ravgeetdhillon/newcomers-shoutoout/merge_requests) to make the project better. 

Lemme know if you have any doubt, appreciation or anything else that you would like to communicate to me. You can tweet me [@ravgeetdhillon](https://twitter.com/intent/tweet?screen_name=ravgeetdhillon&original_referer={{ page.url }}&ref_src=twsrc%5Etfw). I reply to all the questions as quickly as possible. 😄 And if you liked this post, please [share](https://twitter.com/intent/tweet?text={{ 'Check out this amazing blog post by Ravgeet Dhillon sharing his thoughts on ' | append: page.title | urlencode }}&screen_name=ravgeetdhillon&original_referer={{ page.url }}&ref_src=twsrc%5Etfw) it with your twitter community as well.
