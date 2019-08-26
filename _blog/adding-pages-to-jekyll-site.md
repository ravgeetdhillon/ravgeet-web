---
title: Adding pages to Jekyll site
date: 2019-07-19 14:00:00 +0530
categories: jekyll web-dev
img: newspaper.jpg
img_credits: Photo by [Fabien Barral](https://unsplash.com/@iammrcup) on [Unsplash](https://unsplash.com)
---

This is tutorial can be used to add pages to any Jekyll site. I am assuming that you have setup your Ruby Development Environment. If not, then refer to this document here to get started easily.

Below are few easy steps that you can follow to add pages to your Jekyll site. I have also attached images to explain the process better.

*Note: I have taken the example of [GTK Website][gtk-website], I'm working on. You can find it's Gitlab instance [here][gitlab-repo].*

### Step 1.
In `collections/_docs` directory, create a new file with name: `hello-world.md`.

![](/img/add-pages-to-jekyll-site/screen-1.png)

### Step 2.
I want this page to be available at the following link: [http://localhost:4000/docs/tutorials/hello-world/](http://localhost:4000/docs/tutorials/hello-world/)

Add the following front matter to the `hello-world.md`.
```
---
permalink: /docs/tutorials/:name/
---
```

![](/img/add-pages-to-jekyll-site/screen-2.png)

### Step 3.
Add the your content in the Markdown format to the `hello-world.md.

Add the following front matter to the `hello-world.md`.
```
This is the demo file to show the process of adding new pages to a Jekyll site.
```

![](/img/add-pages-to-jekyll-site/screen-3.png)

### Step 4.
In `_data` directory, open the `navigation.yml` file and update the sidebar_links array by adding the following content:
```
- title: Hello World
  name: hello-world
  section: Tutorials
```
here,
* `title` is display text on sidebar on `docs` page
* `name` is the name of the file which should be pointed to when the link is accessed
* `section` is category this page should fall under

![](/img/add-pages-to-jekyll-site/screen-4.png)

### Step 5.
In case the new file is a main section page, then update the sidebar_sections array by adding the following content:
```
- title: Tutorials
  name: tutorials
```
here,
* `title` is display text on sidebar on `docs` page
* `name` is the name of the file which should be pointed to when the link is accessed

![](/img/add-pages-to-jekyll-site/screen-5.png)

### Step 6.
Save all the files and serve the website on the local server by running the following command.
```
bundle exec jekyll serve
```

![](/img/add-pages-to-jekyll-site/screen-6.png)

### Step 7.
Go to [http://localhost:4000/docs/tutorials/hello-world/](http://localhost:4000/docs/tutorials/hello-world/) and the page is up and running.

[gtk-website]: https://ravgeetdhillon.pages.gitlab.gnome.org/gtk-web/
[gitlab-repo]: https://gitlab.gnome.org/ravgeetdhillon/gtk-web

![](/img/add-pages-to-jekyll-site/screen-7.png)

![](/img/add-pages-to-jekyll-site/screen-8.png)