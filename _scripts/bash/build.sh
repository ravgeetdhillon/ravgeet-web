#!/bin/bash

# setup the website
npm run setup

# build the website
JEKYLL_ENV=production bundle exec jekyll build -d build

# minify the html
npm run minify-html
