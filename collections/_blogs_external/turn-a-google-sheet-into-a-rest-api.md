---
title: Turn a Google Sheet into a REST API

description: Turn your Google Sheet into a REST API and access it in any application.

date: 2021-03-08 12:30:00 +00:00

tags: [google-apps-script,web-app,rest-api]

canonical_details:
  site: RavSam
  url: https://www.ravsam.in/blog/turning-a-google-sheet-into-a-rest-api/
---

What if we can use our Google Sheets as a CMS? What if we want the data in our Google Sheet to be publicly available. This can be done easily using Google Sheets and Google Apps Script. In this blog, we will take a look at how we can convert a Google Sheet into a REST API and access it publicly from any app we want.

### Contents

*   [1\. Setting up a Spreadsheet](#1-setting-up-a-spreadsheet)
*   [2\. Creating a Google Apps Script](#2-creating-a-google-apps-script)
*   [3\. Converting data to JSON format](#3-converting-data-to-json-format)
*   [4\. Creating a Web App](#4-creating-a-web-app)
*   [Results](#results)

1\. Setting up a Spreadsheet
----------------------------

The first task is to set up a Spreadsheet and initialize it with some data.

![Format for Google Spreadsheet](https://www.ravsam.in/assets/images/blog-assets/google-sheet-for-rest-api.png)

Google Spreadsheet with some data

2\. Creating a Google Apps Script
---------------------------------

The first step in our journey to convert the above Google Sheet into a REST API is to be able to access the data in it. So, from *Tools*, select *Script Editor*. This will create a new Apps Script project.

Let us start by adding the following snippet of code in the `Code.gs` file.

```
function json(sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = spreadsheet.getSheetByName(sheetName)
  const data = sheet.getDataRange().getValues()
  const jsonData = convertToJson(data)
  return ContentService
        .createTextOutput(JSON.stringify(jsonData))
        .setMimeType(ContentService.MimeType.JSON)
}
```

The above function is really simple to understand. All we are doing is:

*   Get the current active spreadsheet to which this Apps Script project is linked with,
*   Get our specific sheet by its name
*   Get the data in that sheet
*   Convert the data to JSON format
*   Return the JSON response

3\. Converting data to JSON format
----------------------------------

The data returned by the `sheet.getDataRange().getValues()` is of the following format:

```
[
  ['name', 'age', 'role'],
  ['John', 28.0, 'Front End Engineer'],
  ['Marry', 21.0, 'Staff Engineer'],
  ['Jackson', 22.0, 'Backend Engineer']
]
```

In the above snippet, we can see that there is a custom function `convertToJson` that needs to be written. To convert our sheet data with headers into JSON format, let us the following code in our Apps Script.

```
function convertToJson(data) {
  const headers = data[0]
  const raw_data = data.slice(1,)
  let json = []
  raw_data.forEach(d => {
      let object = {}
      for (let i = 0; i < headers.length; i++) {
        object[headers[i]] = d[i]
      }
      json.push(object)
  });
  return json
}
```

4\. Creating a Web App
----------------------

To access our Google Sheet as a REST API, we need to publish our Google Apps Script as a Web App. This web app will handle the **GET requests**.

Let us add the following code in our Apps Script file:

```
function doGet(e) {
  const path = e.parameter.path
  return json(path)
}
```

Once we are done with this, the final step is to publish our Apps Script as a Web App. We can simply create a new deployment and set the *Execute As* to **me** and *Who has access* to **Anyone**. These settings allow our Web App to be publicly accessible.

Results
-------

Let us send a GET request to our published Web App using Postman. The path for the GET request would be our Web App’s URL and query parameter **path** set to our Google Sheet’s name.

In our case, the URL is `https://script.google.com/macros/s/AKfycbw9gpHbIauF8obidyDjxe3_L9qA-Ww-e8bv6pvNNGavAv-xxxxxxxxxxxxxxxxxxxxxxx/exec?path=people`.

![Google Sheet as a REST API](https://www.ravsam.in/assets/images/blog-assets/google-sheet-rest-api-response.png)

Google Sheet as a REST API

Alright! We can see that we have transformed our Google Sheet into a REST API in under five minutes using the above code. We can add more sheets in our spreadsheet and access them simply using the sheet name in the path query parameter when sending a GET request.
    