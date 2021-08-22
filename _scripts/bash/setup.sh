#!/bin/bash

# install gem dependencies
gem install bundler -v "$(grep -A 1 "BUNDLED WITH" Gemfile.lock | tail -n 1)"
bundle install

# install npm dependencies
npm install

# compile css
npm run compile-css

# compile js
npm run compile-js
