---
title: Dynamic Home Route in a Flutter App

description: Dynamically decide the home page to be shown to a user in a Flutter App based on some authentication logic.

date: 2021-01-09 08:50:00 +00:00

tags: [flutter,mobile-app]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/dynamic-home-route-in-flutter-app/
---

In any production app, the user is directed to a route based on some authentication logic whenever the app is opened. In our Flutter App, we have at least two routes, **Login** and **Dashboard**. The problem is how can we decide which route should a user be redirected to?

In this app, we will check the value of a locally stored boolean variable to dynamically decide the home route. We can use any method for writing our authentication logic, like checking the validity of the API token, but for the sake of simplicity, we will explore a simple logic.

![Flutter Dynamic Home Route](https://www.ravsam.in/assets/images/blog-assets/flutter-dynamic-home-route.png)

Flutter Dynamic Home Route Flowchart

Contents
--------

*   [Contents](#contents)
*   [1\. Installing Dependencies](#1-installing-dependencies)
*   [2\. Writing Code](#2-writing-code)
*   [Results](#results)

1\. Installing Dependencies
---------------------------

In our pubspec.yaml, let us add the following dependencies that we will be using in our Flutter application:

```
dependencies:
  shared_preferences: ^0.5.12+4
  async: ^2.4.2
```

> Make sure to install the latest version of the dependencies.

[Shared Preferences](https://pub.dev/packages/shared_preferences) is a simple Flutter plugin for reading and writing simple key-value pairs to the local storage. [Async](https://pub.dev/packages/async) contains the utility functions and classes related to the *dart:async* library.

After adding these dependencies, it is now time to install them. In the terminal, let us execute the following command:

```
flutter pub get 
```

2\. Writing Code
----------------

In our `main.dart`, let us add the following code:

```
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() async {

  // handle exceptions caused by making main async
  WidgetsFlutterBinding.ensureInitialized();

  // init a shared preferences variable
  SharedPreferences prefs = await SharedPreferences.getInstance();
  
  // get the locally stored boolean variable
  bool isLoggedIn = prefs.getBoolean('is_logged_in');
  
  // define the initial route based on whether the user is logged in or not
  String initialRoute = isLoggedIn ? '/' : 'login';

  // create a flutter material app as usual
  Widget app = MaterialApp(
    ...
    initialRoute: initialRoute,
  );

  // mount and run the flutter app
  runApp(app);
}
```

The code is pretty self-explanatory. All we are doing is getting the value of `is_logged_in` boolean variable, and then decide the value of the `initialRoute` in our Flutter Material App.

One important thing in the above code is the use of the *async-await* pattern. We can also use `then` but it makes the code a little messy and that’s what we are trying to avoid here. Making our `main()` function asynchronous can cause some exceptions, so to solve this, we need to add `WidgetsFlutterBinding.ensureInitialized()`.

Results
-------

That’s it. We have successfully written a code that allows us to redirect the user to the **Dashboard** page if they are logged in, otherwise to the **Login** page. If you any doubts or appreciation for our team, let us know in the comments below.
    