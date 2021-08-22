#!/bin/bash

# path to production css directory
prod_css_dir='assets/prod-css'

# remove existing production css directory
rm -rf $prod_css_dir && mkdir -p $prod_css_dir

# name for the hash file
hash_yml_file='_data/css_hashes.yml'

# remove the pre existing hash file and create the hash file
rm $hash_yml_file && touch $hash_yml_file

# compile scss into assets/prod-css directory
node-sass assets/scss/ -o $prod_css_dir --output-style compressed

# file name for the index css file
global_css_file="$prod_css_dir/global.css"

# concatenate each css file into a single file
for file in $(find $prod_css_dir -type f -name "*.css")
do
    cat $file >> $global_css_file
    echo "Appended $file to $global_css_file"
done

# create md5sum hash for the global css file
hash=$(md5sum $global_css_file | cut -c -32)

# create new file name with hash
file_ext="${global_css_file##*.}"
file_base_name="${global_css_file%.*}"
file_name_with_hash="$file_base_name.$hash.$file_ext"

# rename the file
mv $global_css_file $file_name_with_hash

# add the generated hash to hashes file
echo "- /$file_name_with_hash" >> $hash_yml_file

# show process info
echo "Added hash to $file_name_with_hash"
ls -sh $file_name_with_hash
