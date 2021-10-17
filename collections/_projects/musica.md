---
title: Musica

tags: [aAutomation]

tools: [Python, Google API, GitHub Actions]

mini_description: A project to automate my music release on YouTube.

github: https://github.com/ravgeetdhillon/musica

img: musica.png
---

Musica is an automation project which I designed to automate my music release on [my YouTube channel](https://youtube.com/ravdmusic). It is written in Python, automated using GitHub Actions and powered by Google Drive and YouTube API. The github Actions' workflow runs every 2nd day. It scans my Google Drive to check if there are any new tracks to upload. If there is at least one new track, it downloads the track and the artwork related to it. Then by using FFmpeg, it creates a video from the downloaded track and artwork. The new video is uploaded to my Youtube channel using YouTube API and video metadata is filled automatically.
