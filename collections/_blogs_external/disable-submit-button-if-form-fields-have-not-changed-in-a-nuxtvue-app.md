---
title: Disable Submit button if Form fields have not changed in a Nuxt/Vue app

description: Learn how to keep a form's submit button disabled until the form fields have not changed in a Nuxt/Vue app.

date: 2021-01-29 08:50:00 +00:00

tags: [nuxt,vue,jamstack,javascript,web-development]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/disable-submit-button-if-form-fields-have-not-changed-in-a-nuxt-vue-app/
---

Forms are one of the most important aspects of any application. It is considered a good UX practice to keep the **Save/Submit** button disabled until the form contents have not changed. In this blog, we will take a look at how can we accomplish this behaviour in a Nuxt/Vue app.

### Contents

*   [1\. Creating a Form Template](#1-creating-a-form-template)
*   [2\. Writing Vuex Code](#2-writing-vuex-code)
*   [3\. Writing Computed and Watch properties](#3-writing-computed-and-watch-properties)
*   [Results](#results)

1\. Creating a Form Template
----------------------------

Let us create a simple form which will help us to understand the concepts of **computed** and **watch** properties. In our `index.vue` in `pages` directory, let us add the following form template:

```
<template>
  <form>
    <label>Name</label>
    <input v-model='form.name' />

    <label>Age</label>
    <input v-model='form.age' />

    <button :disabled="!changed">Save</button>
  <form>
</template>
```

Let us understand the above template. We have bound our `form` data model to form inputs using **v-model**. In our **Save** button, we will disable it if the form fields have not changed.

2\. Writing Vuex Code
---------------------

In this example, we will use **Vuex Store’s** state, actions and mutations to store state and fetch our form data.

```
// initialize the state variables
export const state = () => ({
  form: {}
})

export const actions = {
  // action to setup form data
  // we can also do an api call as well
  init({ commit }) {
    const data = {
      name: 'Ravgeet',
      age: '21',
    }

    // commit mutuation for changing the state
    commit('setFormData', data)
  }
}

export const mutations = {
  // mutation to change the state
  setFormData(state, data) {
    state.form = data
  }
}
```

3\. Writing Computed and Watch properties
-----------------------------------------

Our template and Vuex Store are set. Now is the time to implement our application logic in our template’s script. In our `pages/index.vue`, let us add the following code:

```
<script>
import _ from 'lodash'

export default {
  data() {
    return {
      changed: false, // useful for storing form change state
      form: {}, // data variable to store current form data binding
    }
  },

  computed: {
    // store the original form data
    originalForm() {
      return this.$store.state.form
    }
  },
  
  watch: {
    // by watching the original form data
    // create a clone of original form data
    // and assign it to the form data variable
    originalForm() {
      this.form = _.cloneDeep(this.originalForm)
    },

    // watch the changes on the form data variable
    form: {
      handler() {
        // using lodash to compare original form data and current form data
        this.changed = !_.isEqual(this.form, this.originalForm)
      },
      // useful to watch deeply nested properties on a data variable
      deep: true,
    },
  },

  created() {
    // dispatch an action to fill the store with data
    this.$store.dispatch('init')
  }
}
</script>
```

In our **computed** and **watch** properties, we need to clone and compare JS objects. **Lodash** is a great library for working with JS objects and we will install the same by doing:

```
$ npm install --save lodash
```

Now that we have written our code, let us understand what is happening in the above code.

*   When the component is created, an action, `init` is dispatched using **created** hook. This action causes a mutation in the store and fills the `form` state variable.
    
*   The value of the computed property, `originalForm` is calculated as it is dependent upon `form` state variable.
    
*   As the value of `originalForm` is being watched using **watch** hook, the code inside it is executed. A deep clone of `originalForm` is made and assigned to `form` data variable.
    
*   Since the value of `form` is being watched, we use a handler and deep property to run our business logic. We simply check whether the `form` and `originalForm` variables are equal using Lodash.
    

At first, it looks like something very complex is going on but once we break down the things it makes sense.

Results
-------

Let us navigate to our browser and check whether we have been able to achieve our purpose of disabling the form submit button if the form fields have not changed at all.

![Tutorial to display notification when user is offline in Nuxt/Vue](https://www.ravsam.in/assets/images/blog-assets/nuxt-disable-save.gif)

*Voila*! We have successfully implemented our workflow. This adds to the UX of our application and saves the user from the frustration especially in long forms. If you any doubts or appreciation for our team, let us know in the comments below. We would be happy to assist you.
    