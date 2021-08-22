---
title: Setup and Customize Bootstrap in Next.js

description: Learn how to improve the look and feel of the Next project by configuring the default Bootstrap behaviour.

date: 2021-07-01 08:10:00 +00:00

tags: [next, bootstrap, javascript, web-design]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/setup-and-customize-bootstrap-in-nextjs/
---

A few months back, we wrote a blog on [how to add and customize Bootstrap in Nuxt.js](/blog/how-to-add-customize-bootstrap-in-nuxtjs/). Today, we will learn how to set up Bootstrap in a Next.js project. We will also install [react-bootstrap](https://www.npmjs.com/package/react-bootstrap) to use Bootstrap based React components.

### Contents

- [1\. Installing Bootstrap](#1-installing-bootstrap)
- [2\. Creating a Custom SCSS](#2-creating-a-custom-scss)
- [3\. Configuring Next Config](#3-configuring-next-config)
- [4\. Importing Bootstrap](#4-importing-bootstrap)

1\. Installing Bootstrap
------------------------

Let us get started by installing the required NPM packages. We will install [bootstrap](https://getbootstrap.com) and optionally [react-bootstrap](https://react-bootstrap.github.io/).

Since we are going to create custom *SCSS* files, we also need to install *node-sass*.

```
npm install --save bootstrap react-bootstrap node-sass
```

2\. Creating a Custom SCSS
--------------------------

Let us now create a custom *scss* file in the `styles/scss` directory, and name it *global.scss*. In this file, we need to import Bootstrap’s `bootstrap.scss`. For the sake of simplicity, let us override the default colour system provided by Bootstrap.

```
$theme-colors: (
  'primary': #145bea,
  'secondary': #833bec,
  'success': #1ce1ac,
  'info': #ff7d50,
  'warning': #ffbe0b,
  'danger': #ff007f,
  'light': #c0ccda,
  'dark': #001738,
);

@import '/node_modules/bootstrap/scss/bootstrap.scss';
```

3\. Configuring Next Config
---------------------------

The best part about the newer versions of Next is that they provide built-in SASS/SCSS support. All we need to tell Next is where our styles are stored by configuring the `next.config.js` and adding the following piece of code:

```
const path = require('path')

module.exports = {
  
  ...

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
```

4\. Importing Bootstrap
-----------------------

The final step is to import our custom Bootstrap into our project. Based on where we need to use the custom styles, we can import our `global.scss`. In this example, let us configure it to be used by the entire project.

In `pages/_app.js` file, we need to add the following code:

```
import 'styles/scss/global.scss' // added

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
```

We have done it. We have set up Bootstrap in our Next project.
    