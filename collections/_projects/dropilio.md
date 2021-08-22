---
title: Dropilio
tags: [web-dev, hackathon]
tools: [php, heroku, twilio-api, dropbox-api]
mini_description: A REST API service for sending local files as attachments with Twilio Whatsapp API.
github: https://github.com/ravgeetdhillon/dropilio/
img: dropilio.png
---

Dropilio is a REST API service for sending local files as attachments with Twilio Whatsapp API. This leverages the use of Twilio Whatsapp API for Desktop applications such as those built in Electron, GTK, etc.

If you are working on a Desktop application, and you want to send a Whatsapp message along with attachments using Twilio Whatsapp API, you must include a link to that attachment as a media resource. For this, your attachment must be somewhere on the Internet. Dropilio solves this problem by uploading your attachment to your Dropbox account and then gets a temporary link that can be used by the Twilio Whatsapp API.

#### Usage

#### Generating a Dropilio key

> Using a long hash key is essential so that you can restrict unwanted access to your API endpoint. Use the following procedure to generate a Dropilio key.

##### Curl Request

```bash
curl https://example.herokuapp.com/key.php \
-F TWILIO_SID=ACd61axxxxxxxxxxxxxxxxxxxxxxxxxxxx \
-F TWILIO_TOKEN=1bfe3edaxxxxxxxxxxxxxxxxxxxxxxxx \
-F DROPBOX_KEY=eosylepoxxxxxxx \
-F DROPBOX_SECRET=owmt7xxxxxxxxxx \
-F DROPBOX_TOKEN=5r-OszpmbJAAAAAAAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

##### Dropilio Response

```json
{
    "data": {
        "hash": "r7c1c78ebruerc17r8c1c5c4x212pi2w21x2z1c8rrermeucpiwmzputz4zyewe7ekne83367323ccuewewng1084dncy484nknccnkxe9eulaqppqpqnbchciuirrer"
    },
    "errors": 0,
    "errors_list": [],
    "status": 200
}
```

#### Sending Whatsapp message with media

> To send Whatsapp message with media, `to`, `body`, `media` parameters are required. Make sure you use country code in the `to` parameter.

##### Curl Request

```bash
curl https://example.herokuapp.com/ \
-F to=+9197801xxxxx \
-F body="Your message goes here." \
-F "media=@/path/to/the/file" \
-H "Accept: application/json" \
-H "Authorization: your-authorization-key-xxxxxxxxxxxxxxxx"
```

##### Dropilio Response

```json
{
    "data": {
        "account_sid": "ACd61axxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "body": "Your message goes here.",
        "direction": "outbound-api",
        "from": "whatsapp:+14155238886",
        "num_media": "1",
        "sid": "MMe63f3bb421xxxxxxxxxxxxxxxxxxxxxx",
        "status": "queued",
        "subresource_uris": "\/2010-04-01\/Accounts\/ACd61axxxxxxxxxxxxxxxxxxxxxxxxxxxx\/Messages\/MMe63f3bb421xxxxxxxxxxxxxxxxxxxxxx\/Media.json",
        "to": "whatsapp:+9197801xxxxx",
        "uri": "\/2010-04-01\/Accounts\/ACd61axxxxxxxxxxxxxxxxxxxxxxxxxxxx\/Messages\/MMe63f3bb421xxxxxxxxxxxxxxxxxxxxxx.json"
    },
    "errors": 0,
    "errors_list": [],
    "status": 200
}
```

#### Sending Whatsapp message without media

> To send Whatsapp message without media, `to`, `body` parameters are required. Make sure you use correct country code in the `to` parameter.

##### Curl Request

```bash
curl https://example.herokuapp.com/ \
-F to=+9197801xxxxx \
-F body="Your message goes here." \
-H "Accept: application/json" \
-H "Authorization: your-authorization-key-xxxxxxxxxxxxxxxx"
```

##### Dropilio Response

```json
{
    "data": {
        "account_sid": "ACd61axxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "body": "how are you?",
        "direction": "outbound-api",
        "from": "whatsapp:+14155238886",
        "num_media": "0",
        "sid": "SMdf924da6e3xxxxxxxxxxxxxxxxxxxxxx",
        "status": "queued",
        "subresource_uris": "\/2010-04-01\/Accounts\/ACd61axxxxxxxxxxxxxxxxxxxxxxxxxxxx\/Messages\/SMdf924da6e3xxxxxxxxxxxxxxxxxxxxxx\/Media.json",
        "to": "whatsapp:+919780221904",
        "uri": "\/2010-04-01\/Accounts\/ACd61axxxxxxxxxxxxxxxxxxxxxxxxxxxx\/Messages\/SMdf924da6e3xxxxxxxxxxxxxxxxxxxxxx.json"
    },
    "errors": 0,
    "errors_list": [],
    "status": 200
}
```

#### Sending with an invalid key

> Sending an invalid key in the Authorization header will result in an invalid key error.

##### Curl Request

```bash
curl https://example.herokuapp.com/ \
-F to=+9197801xxxxx \
-F body="Your message goes here." \
-F "media=@/path/to/the/file" \
-H "Accept: application/json" \
-H "Authorization: invalid-authorization-key-xxxxxxxxxxxxxxxx"
```

##### Dropilio Response

```json
{
    "data": [],
    "errors": 1,
    "errors_list": [
        "Key is either incorrect or tampered"
    ],
    "status": 403
}
```

#### Sending request without mandatory parameters and headers

> The parameters `to`, `body` are mandatory. The `Authorization` header is mandatory as well.

##### Curl Request

```bash
curl https://example.herokuapp.com/ \
-F to=+9197801xxxxx \
-F "media=@/path/to/the/file" \
-H "Accept: application/json"
```

##### Dropilio Response

```json
{
    "data": [],
    "errors": 2,
    "errors_list": [
        "Authorization key is either empty or invalid",
        "body parameter is either empty or invalid"
    ],
    "status": 400
}
```

#### Sending request to invalid endpoint

> Sending a request to a non-existent URL will result in a `Not found` error.

##### Curl Request

```bash
curl https://example.herokuapp.com/other-url.php \
-F to=+9197801xxxxx \
-F body="Your message goes here." \
-F "media=@/path/to/the/file" \
-H "Accept: application/json" \
-H "Authorization: your-authorization-key-xxxxxxxxxxxxxxxx"
```

##### Dropilio Response

```json
{
    "data": [],
    "errors": 1,
    "errors_list": [
        "Not found."
    ],
    "status": 404
}
```