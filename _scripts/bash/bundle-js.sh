#!/bin/bash

# list of js files required by every page
required_by_all_js_files=('node_modules/bootstrap/dist/js/bootstrap.js')

# path to production js directory
prod_js_dir='assets/prod-js'

# remove existing production js directory and create a new one
rm -rf $prod_js_dir && mkdir -p $prod_js_dir

# name for the hash file
hash_yml_file='_data/js_hashes.yml'

# remove the pre existing hash file and create the hash file
rm $hash_yml_file && touch $hash_yml_file

# file name for the index js file
global_js_file="$prod_js_dir/global.js"

# concatenate each js file into a single file
for file in "${required_by_all_js_files[@]}"
do
    cat $file >> $global_js_file
    echo "Appended $file to $global_js_file"
done

# minify and mangle the resultant js file
terser --compress --mangle --comments false -o $global_js_file -- $global_js_file

# create md5sum hash
hash=$(md5sum $global_js_file | cut -c -32)

# create new file name with hash
file_ext="${global_js_file##*.}"
file_base_name="${global_js_file%.*}"
file_name_with_hash="$file_base_name.$hash.$file_ext"

# rename the file
mv $global_js_file $file_name_with_hash

# add the generated hash to hashes file
echo "- /$file_name_with_hash" >> $hash_yml_file

# show process info
echo "Added hash to $file_name_with_hash"
ls -sh $file_name_with_hash
