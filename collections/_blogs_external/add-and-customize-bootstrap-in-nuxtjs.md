---
title: Add and customize Bootstrap in Nuxt.js

description: Learn how to improve the look and feel of a Nuxt project by configuring the default Bootstrap behavior.

date: 2020-12-20 07:37:00 +00:00

tags: [nuxt,bootstrap,javascript,web-design]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/how-to-add-customize-bootstrap-in-nuxtjs/
---

Configuring things in any framework is always tricky especially when we are just starting. We will learn today that how can we add and customize Bootstrap in our Nuxt project. Once we go through this guide, we will get an overall idea of how to make things work in Nuxt. By learning how to setup Bootstrap, we can install Popper.js and JQuery as well which are peer dependencies for Bootstrap.

### Contents

*   [1\. Installing Bootstrap](#1-installing-bootstrap)
*   [2\. Creating a Custom SCSS](#2-creating-a-custom-scss)
*   [3\. Importing Bootstrap Vue](#3-importing-bootstrap-vue)
*   [4\. Configuring Nuxt Config](#4-configuring-nuxt-config)

1\. Installing Bootstrap
------------------------

Before starting, let us install the required NPM packages. We will install [bootstrap](https://getbootstrap.com) and optionally [bootstrap-vue](https://bootstrap-vue.org) if we want to use Bootstrap Vue components.

Since we are going to create custom *SCSS* files, we need to install some dev dependencies as well. In this case, we will install *sass-loader* and *node-sass*.

```
npm install --save bootstrap bootstrap-vue
npm install --save-dev sass-loader node-sass
```

2\. Creating a Custom SCSS
--------------------------

Let us now create a new *scss* file in the `assets/scss` directory, and name it *custom.scss*. In this file, we need to import Bootstrap’s `bootstrap.scss`. Let us add the following styling to change the default color system of Bootstrap.

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

@import '~/node_modules/bootstrap/scss/bootstrap.scss';
```

> We can import individual *scss* files as well but as the project grows we need to use all the modules. It is of course a good idea to only import what is needed. So instead of worrying about increased module size, we can use [PurgeCSS](https://purgecss.com/guides/nuxt.html) plugin for Nuxt to remove unused CSS from our project when we build it for production.

3\. Importing Bootstrap Vue
---------------------------

Using Bootstrap Vue in our project is really simple. We need to create a plugin and install it via `Vue.use()` to access Vue components globally in our project. Let us create a `bootstrap.js` file in *plugins* directory and add the following code:

```
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
```

> Importing **IconsPlugin** is optional. We can skip it in case we prefer to use FontAwesome icons or any other icon library.

4\. Configuring Nuxt Config
---------------------------

The final step is to configure some settings in `nuxt.config.js`. Let us change our config to look like this:

```
export default {
  
  ...

  // add your custom sass file
  css: ['@/assets/scss/custom.scss', ...],

  // add your plugin
  plugins: ['~/plugins/bootstrap.js', ...],

  // add bootstrap-vue module for nuxt
  modules: ['bootstrap-vue/nuxt', ...],

  // specify module rules for css and scss
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  
  // use these settings to use custom css
  bootstrapVue: {
    bootstrapCSS: false,
    icons: true,
  },

  ...
}
```

That’s it. We have set up our Nuxt project to use customize the default Bootstrap settings. We can override any Bootstrap defaults and customize the look and feel of our project to our advantage. If you any doubts, let us know in the comments below.
    