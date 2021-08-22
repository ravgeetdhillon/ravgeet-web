---
title: How to achieve a redesign of your website?

description: In this blog, we talk about the practices we used while redesigning our website from scratch. We built the website in Jekyll and deployed it on Netlify.

date: 2020-07-22 08:30:00 +00:00

tags: [github-actions,netlify,jamstack,bootstrap,web-design]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/redesigning-your-website/
---

Over the past few months, we have been thinking about **redesigning our website**. Since the start of 2018, we have been using new tools, frameworks, and updated design guidelines for our customers’ websites. But our very own website was outdated, and no one from our team liked it anymore. So we decided to put some of our time in giving a fresh look and a performance boost that it deserved.

In this blog, we will discuss about technical tools and practices we used while working on this project. We used the following points as a base for redesigning our website.

### Contents

*   [1\. Choosing a Static Site Generator](#1-choosing-a-static-site-generator)
*   [2\. Setting up a Design Framework](#2-setting-up-a-design-framework)
*   [3\. Git Version Control](#3-git-version-control)
*   [4\. Handling Deployment](#4-handling-deployment)

1\. Choosing a Static Site Generator
------------------------------------

Previously, we have been using WordPress for our website. At the start of 2018, we learned about the [Static Site Generators](https://www.netguru.com/blog/what-are-static-site-generators). They are secure, fast, and easy to configure. The best advantage of a Static Site Generator is its speed. It pleases your SEO team and search engine as well. It gives us the option to write pretty URLs that are easy to index and understandable for both the reader and the search engine crawler. For a non-technical customer, it can be integrated easily with the [Content Management Systems](https://www.zesty.io/mindshare/marketing-technology/what-is-a-content-management-system-cms-the-complete-guide/) made especially for the Static Site Generators.

![A banner containing Jekyll logo](https://www.ravsam.in/assets/images/blog-assets/jekyll.jpeg)

Jekyll is the most popular SSG for desiging blogs

For our website, we used [Jekyll](https://jekyllrb.com/), which is a Static Site Generator written in Ruby. It is the default Static Site Generator for the [Github Pages](https://pages.github.com/) as well and has immense community support.

2\. Setting up a Design Framework
---------------------------------

Setting up a design framework is always a crucial task in the website redesign. For our [website design projects](/services/website-design/), we love to use a stable community-managed design framework. The reason for this is that it has been developed after years of iterations and from the contributions of the designers around the world. So we settled with the [Bootstrap](https://getbootstrap.com/). It is easy to use, customize, and helps in designing websites that not just look great but also perform well on different devices and browsers.

![A banner containing Bootstrap logo](https://www.ravsam.in/assets/images/blog-assets/bootstrap.png)

We created a beautiful and maintainable website with Bootstrap v4

3\. Git Version Control
-----------------------

Git Version Control is one of the best innovations of the century. It helps the teams around the world to develop and maintain software collaboratively and iteratively. We use Github to host the code for our website. It allows our team to create issues, pull requests, and different versions of our website. In 2019, Github introduced a new feature called Github Actions. It allows us to **create automated workflows** that get triggered when a particular event happens on the git repository.

![A banner containing Github logo](https://www.ravsam.in/assets/images/blog-assets/github.png)

We use Github and Github Actions for automated deployments

We use Github Actions to test the quality of our website. The workflows run periodically to make sure that our website is free of any issues. We set up the workflows that use Lighthouse CI and send the test results back to our Slack channel. On every push to the master branch, a notification is sent to the Netlify to build a new version of the website.

4\. Handling Deployment
-----------------------

When we started our **website redesign**, there was a new tech stack in the market, [JAMstack](https://jamstack.org/). It is a new way of **designing static websites**. It offers faster performance, higher security, and better customer experience. The pages are built at the deploy time since they are static. This helps to minimize the time to the first byte. The pre-built files are delivered from the nearest CDN to the customer rather than a single server. [Netlify](https://www.netlify.com/) is one such service that offers hosting for websites that use JAMstack. It eliminates the need to set up servers, DevOps, or costly infrastructure. It provides us with the opportunity to collect form responses from our website without setting any backend service.

![A banner containing Netlify logo](https://www.ravsam.in/assets/images/blog-assets/netlify.png)

Host your websites on Netlify for free

Our website is hosted on Netlify too. Whenever a push is done to the master branch on our git repository, it triggers a build script on Netlify. The purpose of the build script is to convert our Jekyll source code into a static website. Once the website is available, it minifies the assets such as CSS, JS, images, and other optimizations to give a boost to the website speed. Once the build script finishes, the generated website is deployed by Netlify to its CDN around the world. After the **website deployment**, a Slack notification is sent by the Netlify bot to indicate that the process is complete.
    