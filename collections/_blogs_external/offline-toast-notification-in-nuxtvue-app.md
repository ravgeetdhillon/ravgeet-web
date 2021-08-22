---
title: Offline Toast notification in Nuxt/Vue app

description: Display a toast notification in Nuxt/Vue app whenever the user goes offline or online.

date: 2021-01-18 06:05:00 +00:00

tags: [nuxt,vue,jamstack,javascript,web-development]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/offline-toast-notification-in-nuxt-vue-app/
---

We have often seen apps telling us that *“You are offline. Check your network status.”*. It is not only convenient to do so but adds to a great UX. In this blog, we will look at how can we display a toast notification in a Nuxt/Vue app whenever the user goes offline or online. This will also help us to understand how to use **computed** and **watch** properties together.

### Contents

*   [Prerequisites](#prerequisites)
*   [1\. Using $nuxt helper](#1-using-nuxt-helper)
*   [2\. Writing Code](#2-writing-code)
*   [Results](#results)

Prerequisites
-------------

Before getting started, we need to make sure that we have correctly [setup Nuxt and BootstrapVue](/blog/how-to-add-customize-bootstrap-in-nuxtjs).

1\. Using $nuxt helper
----------------------

Nuxt provides a great way to access its helper class, `$nuxt`. In order to get the current network connection status, we can do two things:

```
<template>
  <p>$nuxt.isOffline</p>
  <p>$nuxt.isOnline</p>
</template>

<script>
export default {
  created() {
    console.log(this.$nuxt.isOffline)
    console.log(this.$nuxt.isOnline)
  }
}
</script>
```

Yes, it is as simple as that.

Now in BootstrapVue, we can create toasts on-demand using `this.$bvToast.toast()`. So we can implement the notification behaviour using **computed** and **watch** properties provided by Vue.

2\. Writing Code
----------------

The best place to add the following piece of code is in our *layouts/default.vue*. Doing so can help us to implement a universal kind of notification behaviour.

```
<template>
  <Nuxt />
</template>

<script>
export default {
  computed: {
    connectionStatus() {
      return this.$nuxt.isOffline
    },
  },
  watch: {
    connectionStatus(offline) {
      if (offline) {

        // hide the online toast if it exists
        this.$bvToast.hide('online')

        // create a new toast for offline notification
        // that doesn't hide on its own
        this.$bvToast.toast('You are now offline', {
          id: 'offline',
          toaster: 'b-toaster-bottom-right',
          noCloseButton: true,
          solid: true,
          noAutoHide: true,
          variant: 'danger',
        })
      } else {

        // hide the offline toast if it exists
        this.$bvToast.hide('offline')

        // create a new toast for online notification
        // that auto hides after a given time
        this.$bvToast.toast('You are now online', {
          id: 'online',
          toaster: 'b-toaster-bottom-right',
          noCloseButton: true,
          solid: true,
          autoHideDelay: 5000,
          variant: 'success',
        })
      }
    },
  },
}
</script>
```

Let us go through the above code. First of all, we create a **computed** property, `connectionStatus`. In `connectionStatus`, we return the value of `this.$nuxt.isOffline`. Now in Vue, whenever a property, a computed is dependent upon changes, the computed property also changes. So whenever `this.$nuxt.isOffline` changes, `connectionStatus` gets a new value.

We can **watch** the value of `connectionStatus` and do things based on its new value. In our case, we check whether the changed value of `connectionStatus` is `true(offline)`. Depending upon this we display our toast notification using BootstrapVue.

Results
-------

Let us go back to our browser and check whether the above code works or not. In the Network tab in Developer Tools, let us toggle the network connection status.

![Tutorial to display notification when user is offline in Nuxt/Vue](https://www.ravsam.in/assets/images/blog-assets/nuxt-connection-status.gif)

Hurray! Our toast notifications are working perfectly fine. So using the combined magic of **computed** and **watch** properties, we can create outstanding workflows and take our Nuxt/Vue app to next level. If you any doubts or appreciation for our team, let us know in the comments below. We would be happy to assist you.
    