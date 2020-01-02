dependencies=('bootstrap' 'jquery' 'popper.js' '@fortawesome' 'animate.css' 'moment')
for dependency in "${dependencies[@]}"
do
    rsync -a node_modules/${dependency} assets
    echo "Moved ${dependency} to assets/ folder"
done
