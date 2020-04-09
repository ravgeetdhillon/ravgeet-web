# install gem dependencies
gem install bundler -v "$(grep -A 1 "BUNDLED WITH" Gemfile.lock | tail -n 1)"
bundle install

# install npm dependencies
npm install

# structure the website
dependencies=('bootstrap' 'jquery' 'popper.js' '@fortawesome' 'aos')
for dependency in "${dependencies[@]}"
do
    rsync -a node_modules/${dependency} assets
    echo "Moved ${dependency} to assets/ folder"
done

# compile scss to css and minify css
npm run compile-css

# build the webite
bundle exec jekyll build -d public

# minify the html
for i in $(find . -type f -name "*.html");
do
    npm run minify-html $i
done
