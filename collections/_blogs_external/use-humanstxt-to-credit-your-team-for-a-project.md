---
title: Use Humans.txt to credit your team for a project

description: Humans.txt is a text document that contains information about the individuals who worked on the project.

date: 2020-10-13 12:30:00 +00:00

tags: [web-development,web-design]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/use-humans-txt-to-credit-your-team-for-project/
---

We all love to take credit for the work that we are proud of and there is nothing wrong with that. Whenever we work on the project, we put our team/company name in the **footer of the website**, or in the **about section**. However, this doesn’t take into consideration the members of the team who worked on the project. These members can be Designers, Developers, SEOs, QAs, etc. To attribute the team behind the project, there is a thing called [**humans.txt**](http://humanstxt.org/)

What is humans.txt?
-------------------

Humans.txt is a great initiative for listing the individuals who worked behind a project. It’s an initiative for knowing the people behind a website. Basically, it is just a .txt file that contains information about individuals and their roles in a particular project.

Humans.txt Example
------------------

```txt
/* TEAM */
    Project Lead: John Smith
    Contact: johnsmith [at] gmail.com
    Twitter: @johnsmith
    From: New York, USA

    UI Designer: Tim Jacob
    Contact: timjacob [at] gmail.com
    Twitter: @timjacob
    From: New York, USA

    Project Lead: Jennifer Jaine
    Contact: jenniferjaine [at] gmail.com
    Twitter: @jenniferjaine
    From: Toronto, Cananda

/* SITE */
    Last update: 2020/10/05
    Language: English
    Doctype: HTML5
    IDE: VSCode
    Technologies: Jekyll, Python
```

Should we always humans.txt?
----------------------------

Humans.txt is **completely optional**. It is not related to SEO. But it is a way to tell the world about the individuals who worked hard behind the website.

Who to mention on humans.txt?
-----------------------------

We can mention anyone on the humans.txt. We can attribute our designers, developers, SEOs, Project Manager, .etc. On an Open Source project, we can add all the contributors in the humans.txt by automating it through CI/CD.

Where should I add humans.txt?
------------------------------

Humans.txt lives at the **root of the website**. We can add a `<link>` tag in the `<head>` of our website.

```
<link type="text/plain" rel="author" href="http://example.com/humans.txt">
```

We hope that you will use the humans.txt in your current or upcoming project and attribute your team for what they do. Cheers!
    