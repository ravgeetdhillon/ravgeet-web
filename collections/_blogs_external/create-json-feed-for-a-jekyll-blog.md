---
title: Create JSON Feed for a Jekyll blog

description: Recently, many blog owners are migrating their blog feeds to JSON. In this article, we will take a look at how to add JSON feed to a Jekyll blog.

date: 2020-10-25 12:00:00 +00:00

tags: [jekyll,web-development]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/create-json-feed-for-jekyll-blog/
---

The big difference between JSON feed and XML feed is the ability to read and write JSON. Parsing XML is not an easy task whereas when it comes to JSON, we only have to write only a single line of code and use it any way we want. With the advent of JSON-based feed readers, it would be nice if we too have a JSON feed for our blog. In this article, we will be looking at how can use Jekyll and Liquid syntax to create a JSON feed for our blog.

### Contents

*   [Prerequisites](#prerequisites)
*   [1\. Creating a feed.json file](#1-creating-a-feedjson-file)
*   [2\. Writing Liquid Code](#2-writing-liquid-code)
*   [3\. Adding to Head](#3-adding-to-head)
*   [Result](#result)

Prerequisites
-------------

Before proceeding, we assume that

*   Our Jekyll blog is already setup.
*   Our blogs live at the `_blogs` directory

1\. Creating a feed.json file
-----------------------------

First, we will create a `feed.json` file at the root of our website. We will add the following front matter to it:

```
permalink: /blog/feed.json
```

We can specify any permalink we want. Most of the time it is either `/blog/feed.json` or `/feed.json`.

2\. Writing Liquid Code
-----------------------

Let us add the following Jekyll Liquid code to the `feed.json` file. This feed uses the most recent version of [JSON Feed specifications](https://jsonfeed.org/version/1.1).

```
{
    "version": "https://jsonfeed.org/version/1.1",
    "title": "{{ 'JSON Feed for ' | append: site.author | xml_escape }}",
    "description": {{ site.description | jsonify }},
    "favicon": "{{ '/assets/images/logos/favicons/apple-touch-icon.png' }}",
    "language": "en",
    "home_page_url": "{{ "/" }}",
    "feed_url": "{{ "/blog/feed.json" }}",
    "user_comment": "This feed allows you to read the blogs from this site in any feed reader that supports the JSON Feed format.",
    "items": [{% for blog in site.blogs reversed %}
        {
            "id": "{{ blog.url | absolute_url }}",
            "url": "{{ blog.url | absolute_url }}",
            "language": "en",
            "title": {{ blog.title | jsonify }},
            "summary": {{ blog.description | jsonify }},
            "content_html": {{ blog.content | jsonify }},
            "date_published": "{{ blog.date | date_to_xmlschema }}",
            "date_modified": "{{ blog.last_modified_at | date_to_xmlschema }}",
            "image": "{{ blog.image.path }}",
            "banner_image": "{{ blog.image.path }}",
            "authors": [{{ blog.author | jsonify }}],
            "categories": {{ blog.tags | jsonify }},
            "tags": {{ blog.tags | jsonify }}
        }
        {% unless forloop.last %},{% endunless %}{% endfor %}
    ]
}
```

3\. Adding to Head
------------------

One final step is to add a reference to our JSON feed in the `<head>` tag of our website so that anyone looking for our blog feed can find it out here.

```
<link rel="alternate" type="application/json" title="Feed for RavSam Web Solutions" href="/blog/feed.json" />
```

Result
------

That’s it. Let us execute `bundle exec jekyll serve` and check out our feed at [http://localhost:4000/blog/feed.json](http://localhost:4000/blog/feed.json)

![JSON Feed for a Jekyll blog](https://www.ravsam.in/assets/images/blog-assets/json-feed.png)

JSON Feed for a Jekyll blog

As we can see we have successfully created a JSON feed for our blog. We can submit this blog feed to a [JSON Feed Reader](https://json-feed-viewer.herokuapp.com/).

We can also create JSON feeds for **podcasts**, **microblogs**, and submit them to content aggregators. As we move into the future, we will see more and more blogs migrating to the JSON feed as it is extremely easy to consume and setup. If you any doubts or appreciation for our team, let us know in the comments below.
    