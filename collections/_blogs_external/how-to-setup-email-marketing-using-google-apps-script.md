---
title: How to setup Email Marketing using Google Apps Script

description: We can easily set up Email Marketing using Google Apps Script without setting any dedicated servers.

date: 2020-08-27 07:30:00 +00:00

tags: [google-apps-script,automation,email-marketing]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/setup-email-marketing-using-google-apps-script/
---

Recently, we have been writing a lot of stuff related to Web Design and Development, like [collecting form responses](/blog/collect-form-responses-using-google-apps-script/), that can be implemented using **Google Apps Script** and Serverless Architecture. In this blog, we will talk about **email marketing**. We will set up custom email marketing purely using Google Apps Script. The advantage is we can take control of our email marketing campaign and create our own automated workflows.

### Contents

*   [1\. Creating a new Spreadsheet](#1-creating-a-new-spreadsheet)
*   [2\. Creating a new Google Apps Project](#2-creating-a-new-google-apps-project)
*   [3\. Writing code](#3-writing-code)
*   [4\. Running the script](#4-running-the-script)
*   [Results](#results)

1\. Creating a new Spreadsheet
------------------------------

First of all, we need a Google Sheet where we store all of our email addresses to whom we want to send the emails. Let’s [create a new spreadsheet](https://docs.google.com/spreadsheets/).

![Enter the user details in Google Sheet](https://www.ravsam.in/assets/images/blog-assets/setup-sheets.png)

Enter the user details in Google Sheet

2\. Creating a new Google Apps Project
--------------------------------------

Now is the time to connect our Google sheet to a Google Apps Script. From *Tools*, we select the *Script Editor*.

![Connect Google Sheet to Google Apps Script project](https://www.ravsam.in/assets/images/blog-assets/setup-script-editor.png)

Connect Google Sheet to Google Apps Script project

3\. Writing code
----------------

Finally, it is time to write some code.

a.) **Main.gs**

Add the following the code to the file:

```
function sendEmails(mail_template='content',
                    subject='Testing my Email Marketing') {
  
  // get the active spreadsheet and data in it
  var id = SpreadsheetApp.getActiveSpreadsheet().getId();
  var sheet = SpreadsheetApp.openById(id).getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  // iterate through the data, starting at index 1
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var email = row[0];
    var name = row[1];
    
    // check if we can send an email
    if (MailApp.getRemainingDailyQuota() > 0) {
        
      // populate the template
      var template = HtmlService.createTemplateFromFile(mail_template);
      template.name = name;
      var message = template.evaluate().getContent();
      
      GmailApp.sendEmail(
        email, subject, '',
        {htmlBody: message, name: 'RavSam Team'}
      );
    }
  }
}
```

The comments have been included in the file for a proper description of the above function.

> Always use *GmailApp.sendEmail* instead of *MailApp.sendEmail*. It is a more stable and reliant function.

b.) **content.html**

Since the above script uses an HTML file and populates it, we need to create an HTML template file. Add the following the code to the file:

```
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
  </head>
  <body>
    Hi <?= name ?>. We are testing our beta features for email marketing.
  </body>
</html>
```

The `<?= name ?>` template variable gets auto-filled by the email marketing script.

4\. Running the script
----------------------

We have done all the necessary setup to start a successful email marketing campaign. Before we run our code, we need to grant

![Setup the Google Apps Script Authorization](https://www.ravsam.in/assets/images/blog-assets/provide-authorization.png)

Authorize the Google Apps Script to send an email on your behalf

Results
-------

Let us check our email to see if the email was received. Awesome! We can clearly see that email was delivered successfully to the user’s inbox.

![Email Delivered successfully to the inbox](https://www.ravsam.in/assets/images/blog-assets/email-received.png)

Email Delivered successfully to the inbox

We can create more beautiful and custom HTML templates and manage our email marketing campaigns around them. In our next blog, we will be talking about [**how to track whether a user opens our emails or not**](https://www.ravsam.in/blog/track-email-opens-with-google-apps-script/). If you any doubts or appreciation for our team, let us know in the comments below.
    