---
title: Dropilio App for Twilio and Dev Hackathon
date: 2020-04-28 12:00:00 +0530
categories: php web-dev hackathon
description: I submitted Dropilio App for the Twilio and Dev hackathon. The app is a REST API client for sending local files as an attachment to the Whatsapp messages.
img: twilio-hackathon.png
img_credits: Photo by [Dev](https://dev.to) on [Dev.to](https://dev.to)
---

## What I built

Dropilio is a REST API service for sending local files as attachments with Twilio Whatsapp API. This leverages the use of Twilio Whatsapp API for Desktop applications such as those built in Electron, GTK, etc which intend to send notifications with file attachments.

If you are working on a Desktop application, and you want to send a Whatsapp message along with attachments using Twilio Whatsapp API, you must include a link to that attachment as a media resource. For this, your attachment must be somewhere on the Internet. Dropilio solves this problem by uploading your attachment to your Dropbox account and then gets a temporary link that can be used by the Twilio Whatsapp API.

This project belongs to the category of **Interesting Integrations** for [Twilio and Dev hackathon](https://www.twilio.com/blog/introducing-code-exchange-community-and-hackathon).

## Branding

I asked my little brother to come up with the branding for the app. I explained the functionality to him and he came up with this.

![Dropilio App branding by Ravgeet Dhillon](/assets/img/blog/dropilio-branding.png)

## Project Usage

You can browse to the [Dropilio project](https://www.ravgeet.dev/projects/dropilio/) on my website for complete information regarding the project.

## Link to Code

You can always get the development code for the app at [https://github.com/ravgeetdhillon/dropilio](https://github.com/ravgeetdhillon/dropilio).

## How I built it

While interning as a Full Stack Developer at [Techies Infotech](https://techiesinfotech.co.in), I was granted a project to implement this sort of functionality in the native Desktop apps. So I decided to go with the Twilio API. While reading on [Dev](https://dev.to/devteam/announcing-the-twilio-hackathon-on-dev-2lh8), I came to me as a surprise that Twilio and DEV were organizing a hackathon and so, I decided to submit this project for the hackathon after taking approval from my employer.

I used Twilio SDK for PHP and PHP wrapper for Dropboxv2 API by Kunal Verma. I tested the service using Postman and made it live on Heroku.

The most important thing that I learned during the development of this project was security. I learned about how to set up a good authentication for a REST API service. I ended up developing a simple yet secure way to authenticate the requests sent to the API endpoint.

## Additional Resources

- PHP SDK for Dropbox v2 API. - [https://github.com/kunalvarma05/dropbox-php-sdk](https://github.com/kunalvarma05/dropbox-php-sdk)
- PHP SDK for Twilio API. - [https://www.twilio.com/docs/libraries/php](https://www.twilio.com/docs/libraries/php)

Lemme know if you have any doubt, appreciation or anything else that you would like to communicate to me. You can tweet me [@ravgeetdhillon](https://twitter.com/intent/tweet?screen_name=ravgeetdhillon&original_referer={{ page.url | prepend: site.url }}&ref_src=twsrc%5Etfw). I reply to all the questions as quickly as possible. 😄 And if you liked this post, please [share](https://twitter.com/intent/tweet?text={{ 'Check out this amazing blog post by Ravgeet Dhillon sharing his thoughts on ' | append: page.title | urlencode }}&screen_name=ravgeetdhillon&original_referer={{ page.url | prepend: site.url }}&ref_src=twsrc%5Etfw) it with your twitter community as well.
