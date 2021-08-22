---
title: Create a Balance Reminder with Vonage Account API and Google Apps

description: Adding pages to the Jekyll site is pretty simple. In this blog, I share with you some important steps on how to add pages to a documentation website, but the method is universal to any website you want.

date: 2021-06-08 12:00:00 +0530

tags: [jekyll, web-dev]

canonical_details:
  site: Vonage
  url: https://learn.vonage.com/blog/2021/06/08/create-a-balance-reminder-with-vonage-account-api-and-google-apps/
---

Being a freelancer, I have helped a couple of local businesses in India implement Vonage products. Recently, one of my clients asked if they can get a reminder email when the Vonage balance is below a specified limit as they don't want to hamper their operations because of insufficient balance. Almost all of my clients use Google Workspace, so I decided to create an integration of Vonage and Google Apps Script to create this workflow.

Google Apps Script allows us to manage all of Google apps using one platform in the cloud. The best part is that the authentication is baked into the platforms and many businesses in the market use Google Workspace–formerly known as G-Suite.

In this blog post, we will learn how to create custom notifications when our Vonage Account balance is below a specified limit. The post is aimed at those Vonage developers who want to manage their client base effectively by sending them reminders about the Vonage Account balance.

[](#prerequisites)Prerequisites
-------------------------------

*   **Google Account** - We will need a Google Account - Personal or Google Workspace.
*   **Vonage API Account** - We will need a Vonage API account. We can sign up today and start building with free credit. Once we have an account, we can find our API Key and API Secret at the top of the [Vonage API Dashboard](https://dashboard.nexmo.com).

### Vonage API Account

To complete this tutorial, you will need a [Vonage API account](http://developer.nexmo.com/ed?c=blog_text&ct=2021-06-08-create-a-balance-reminder-with-vonage-account-api-and-google-apps). If you don’t have one already, you can [sign up today](http://developer.nexmo.com/ed?c=blog_text&ct=2021-06-08-create-a-balance-reminder-with-vonage-account-api-and-google-apps) and start building with free credit. Once you have an account, you can find your API Key and API Secret at the top of the [Vonage API Dashboard](http://developer.nexmo.com/ed?c=blog_text&ct=2021-06-08-create-a-balance-reminder-with-vonage-account-api-and-google-apps).

[![Start building with Vonage](https://learn.vonage.com/_nuxt/img/StartBuilding_Footer.f5150da.png)](http://developer.nexmo.com/ed?c=blog_banner&ct=2021-06-08-create-a-balance-reminder-with-vonage-account-api-and-google-apps)

[](#create-a-google-apps-script-project)Create a Google Apps Script Project
---------------------------------------------------------------------------

Let us start by creating our first Google Apps Script project. We need to head over to the [Apps Script Home Page](https://script.google.com/home) and create a _New Project_. Once the new project is created, we need to give it a name to remember. We will call our project _Vonage Balance Reminder_.

![A New Google Apps Script](https://learn.vonage.com/content/blog/create-a-balance-reminder-with-vonage-account-api-and-google-apps/1.png)

[](#check-balance)Check Balance
-------------------------------

Let us start with the most important and interesting part of the project.

> Google Apps Script is written in JavaScript, so even if you have basic JavaScript knowledge you can get started.

Let us create a new function, `fetchBalance`, and try to connect to the Vonage REST API by sending a `GET` request to check our balance. We need to write the following code in `Code.gs` file:

    function fetchBalance() {
      // get these credentials from Vonage's dashboard
      const apiKey = '--------' 
      const apiSecret = '----------------'
    
      // construct the api endpoint
      const url = `https://rest.nexmo.com/account/get-balance?api_key=${apiKey}&api_secret=${apiSecret}`
      
      // send a get request
      const response = UrlFetchApp.fetch(url, {'method': 'GET'})
    
      // discard the execution if status code is other than 200
      if (response.getResponseCode() !== 200) return
    
      // convert the response text into a json object
      const jsonResponse = JSON.parse(response.getContentText())
    
      // inspect the response
      Logger.log(jsonResponse)
    }
    
First things first. Before running the above script, we need to get our **Vonage API Key** and **Vonage API Secret**. Both of them are available at [Vonage Dashboard](https://dashboard.nexmo.com).

![Vonage Dashboard for API Key and API Secret](https://learn.vonage.com/content/blog/create-a-balance-reminder-with-vonage-account-api-and-google-apps/13.png)

Replace your set of credentials in the above script and run the `fetchBalance` function.

When we run a function for the first time, we will be asked to authorize the script execution.

![Review Permissions request for Google Apps Script](https://learn.vonage.com/content/blog/create-a-balance-reminder-with-vonage-account-api-and-google-apps/5.png)

We will be provided with a list of all the permissions required to execute the script.

![List of Permissions for Google Apps Script](https://learn.vonage.com/content/blog/create-a-balance-reminder-with-vonage-account-api-and-google-apps/2.png)

Once we have authorized our Google Apps Script project, the above function will execute and the response from the Vonage Account API will be logged in our Logger console.

![API response logs](https://learn.vonage.com/content/blog/create-a-balance-reminder-with-vonage-account-api-and-google-apps/3.png)

To retrieve the balance from the response, let us add the following lines of code to our function:

    // parse the response and extract the account balance
    const currentBalance = jsonResponse.value
    
    // inspect the balance
    Logger.log(currentBalance)
    

Let us re-run the function. We will see that this time we are not prompted for permissions and our function will be executed directly.

![Vonage Account Balance from API response](https://learn.vonage.com/content/blog/create-a-balance-reminder-with-vonage-account-api-and-google-apps/4.png)

Alright, now we have successfully got our Vonage Account balance.

[](#specify-balance-limit)Specify Balance Limit
-----------------------------------------------

The next thing we need to do is to send an alert (in this case, an email) if our current balance is below our specified limit. For this, we need to do some changes to our code:

    function fetchBalance() {
      // get these credentials from Vonage's dashboard
      const apiKey = '--------' 
      const apiSecret = '----------------'
    
      const balanceLimit = 5 // in euros <- added
    
      // construct the api endpoint
      const url = `https://rest.nexmo.com/account/get-balance?api_key=${apiKey}&api_secret=${apiSecret}`
      
      // send a get request
      const response = UrlFetchApp.fetch(url, {'method': 'GET'})
    
      // discard the execution of the response status code is other than 200
      if (response.getResponseCode() !== 200) return
    
      // convert the json string into a json object
      const jsonResponse = JSON.parse(response.getContentText())
    
      // parse the response and extract the account balance
      const currentBalance = jsonResponse.value
    
      if (currentBalance < balanceLimit) { // <- added
        Logger.log('Balance is low') // <- added
      } // <- added
    }
    

We have added a new variable, `balanceLimit`, to specify the amount below which we should be alerted via an email. Then at the end of the script, we have added a simple _if_ condition to compare our _current balance_ and _balance limit_. Let us run the above script, and check our logger for any logs.

![Console log if balance is low](https://learn.vonage.com/content/blog/create-a-balance-reminder-with-vonage-account-api-and-google-apps/7.png)

[](#send-an-email)Send an email
-------------------------------

Our application logic is complete and the final thing we need to add is the code to send an email. This is where you will fall in love with Google Apps Script. All we need to add is this one-liner and we are ready to send an email. We don't need to specify protocols, ports, and other low-level stuff we are so used to.

For any email, we need three things: email recipient, email subject, and email body. Let us modify our `fetchBalance` function, and add email functionality:

    function fetchBalance() {
      // get these credentials from Vonage's dashboard
      const apiKey = '--------' 
      const apiSecret = '----------------'
    
      const balanceLimit = 5 // in euros
      
      const emailSubject = 'Vonage Balance is low' // <- added
      const emailTo = '--------------------' // <- added
    
      // construct the api endpoint
      const url = `https://rest.nexmo.com/account/get-balance?api_key=${apiKey}&api_secret=${apiSecret}`
      
      // send a get request
      const response = UrlFetchApp.fetch(url, {'method': 'GET'})
    
      // discard the execution of the response status code is other than 200
      if (response.getResponseCode() !== 200) return
    
      // convert the json string into a json object
      const jsonResponse = JSON.parse(response.getContentText())
    
      // parse the response and extract the account balance
      const currentBalance = jsonResponse.value
    
      // send a reminder email in case the balance is lower than limit
      if (currentBalance < balanceLimit) {
        const emailBody = `Your current Vonage balance: €${currentBalance} as of ${new Date()}. Please recharge soon.` // <- added
        GmailApp.sendEmail(emailTo, emailSubject, emailBody) // <- added
      }
    }
    

> Feel free to modify the `emailSubject` and `emailBody` as per your liking.

We will be asked for permissions again. It is because we have added a piece of code to send an email that requires user authorization, as the script will send the email on the behalf of the user. So, we need to authorize the new permissions.

![Review Permissions for Google Apps Script](https://learn.vonage.com/content/blog/create-a-balance-reminder-with-vonage-account-api-and-google-apps/6.png)

Once the script execution is completed, we need to check our inbox for the email.

![Email received when Vonage Account balance is low](https://learn.vonage.com/content/blog/create-a-balance-reminder-with-vonage-account-api-and-google-apps/12.png)

> Note: The email will only be sent if your account balance is lower than the balance limit you have set in the script.

[](#check-balance-periodically)Check Balance Periodically
---------------------------------------------------------

One of the best features of Google Apps Script is its **Triggers**. Triggers, or CRON jobs as we sometimes say, allow us to run our script in an automated way without any human intervention. Google Apps Script provides many ways to create triggers, through a UI as well as programmatically.

The trigger frequency depends entirely on our use case. If our Vonage API is used often, it makes sense to run the script more frequently, for instance, on an hourly basis. Otherwise, we can create a trigger that runs our `fetchBalance` function once a day or once a week. Your call!

Let us go ahead and create a trigger programmatically. In `Code.gs`, we need to add the following function:

    function createTrigger() {
      // create a trigger to run fetchBalance function every hour
      ScriptApp.newTrigger('fetchBalance')
          .timeBased()
          .everyHours(1)
          .create()
    }
    

The above script does exactly what it says. It creates a trigger that runs our `fetchBalance` function every single hour. Let us run the `createTrigger` function by selecting it from the action bar.

![Run a createTrigger function](https://learn.vonage.com/content/blog/create-a-balance-reminder-with-vonage-account-api-and-google-apps/8.png)

We will be prompted again for an authorization request. The triggers require the _Allow this application to run when you are not present_ permission. Let us authorize the script and wait for its execution.

![Review Permissions for Google Apps Script](https://learn.vonage.com/content/blog/create-a-balance-reminder-with-vonage-account-api-and-google-apps/9.png)

Once the execution is complete, we need to verify whether a new trigger has been created or not.

In the Sidebar, let us go to _Triggers_.

![Google Apps Script Sidebar](https://learn.vonage.com/content/blog/create-a-balance-reminder-with-vonage-account-api-and-google-apps/10.png)

Alright. We can see that a trigger has been created. We need to wait for some time before the trigger executes.

![Triggers created in Google Apps Script](https://learn.vonage.com/content/blog/create-a-balance-reminder-with-vonage-account-api-and-google-apps/11.png)

We have just created our custom balance reminder. It is really helpful for continuous service.

[](#what-next)What Next?
------------------------

There are many ways to create notifications. We can send Slack notifications, or even use Vonage API to send Whatsapp messages or SMSs to our customers. You can explore more about Vonage API at [Vonage API Developer](https://developer.vonage.com).