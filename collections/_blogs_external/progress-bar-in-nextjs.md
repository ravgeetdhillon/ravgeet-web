---
title: Progress Bar in Next.js

description: Display a Progress Bar on route changes in a Next.js app.

date: 2021-07-21 08:45:00 +00:00

tags: [react,nextjs,web-design,web-development]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/progress-bar-in-next-js/
---

Sometimes when we transition from one route to another, it takes a little time to do so due to different factors. Behind the scenes, it may be rendering a complex page component or doing an API call. In such cases, the app looks like it has frozen for some seconds and then suddenly transitions to the next route. This results in a poor UX. In such cases, it is better to add a progress bar to our application which gives our users a sense that something is loading.

In this tutorial, we learn how to implement a progress bar in a Next.js application.

### Contents

*   [1\. Installing NProgress](#1-installing-nprogress)
*   [2\. Basic Usage](#2-basic-usage)
*   [Results](#results)

1\. Installing NProgress
------------------------

The first step we need to do is to install [nprogress](https://www.npmjs.com/package/nprogress) npm module.

```
npm i --save nprogress
```

2\. Basic Usage
---------------

In `pages/_app.js`, import the following modules:

```
import Router from 'next/router'
import NProgress from 'nprogress'
```

Now, we need to add some Router events to control the behaviour of the progress bar. We need to add the following code:

```
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
```

Depending upon our use case, we can remove the loading spinner that comes by default.

```
NProgress.configure({ showSpinner: false })
```

The final code for `pages/_app.js` will look like this:

```
import Router from 'next/router'
import NProgress from 'nprogress'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

NProgress.configure({ showSpinner: false })

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
```

Results
-------

We are done with the code. Let’s see how our progress bar will look like in a Next.js application.

![](https://www.ravsam.in/assets/images/blog-assets/progress-bar-nextjs.gif)
    