#!/bin/bash

# minify each html file in the build directory
for i in $(find build -type f -name "*.html");
do
    html-minifier --collapse-whitespace --remove-comments --minify-js true $i -o $i
done
