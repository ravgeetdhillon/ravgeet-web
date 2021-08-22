---
title: Converting and Optimizing Images From the Command Line

description: Adding pages to the Jekyll site is pretty simple. In this blog, I share with you some important steps on how to add pages to a documentation website, but the method is universal to any website you want.

date: 2020-12-21 16:26:26 +0000

tags: [jekyll, web-dev]

canonical_details:
  site: CSS Tricks
  url: https://css-tricks.com/converting-and-optimizing-images-from-the-command-line/
---

[Images take up to 50% of the total size](https://httparchive.org/reports/page-weight) of an average web page. And if images are not optimized, users end up downloading extra bytes. And if they’re downloading extra bytes, the site not only takes that much more time to load, but users are using more data, both of which can be resolved, at least in part, by optimizing the images before they are downloaded.

Researchers around the world are busy developing [new image formats](https://web.dev/uses-webp-images/) that possess **high visual quality despite being smaller in size** compared to other formats like PNG or JPG. Although these new formats are still in development and generally have limited browser support, one of them, WebP, is gaining a lot of attention. And while they aren’t really in the same class as raster images, SVGs are another format many of us have been using in recent years because of their inherently light weight.

There are tons of ways we can make smaller and optimized images. In this tutorial, we will write bash scripts that create and optimize images in different image formats, targeting the most common formats, including JPG, PNG, WebP, and SVG. The idea is to optimize images before we serve them so that users get the most visually awesome experience without all the byte bloat.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/12/s_FA3C3321F9CAFCD916B8768871CA8981B9B6DA946376796F2D67EB92118AE5DA_1606733544125_Screenshotfrom2020-11-3016-22-00.png?resize=1273%2C793&ssl=1)

Our targeted directory of images

![](https://i2.wp.com/css-tricks.com/wp-content/uploads/2020/12/s_FA3C3321F9CAFCD916B8768871CA8981B9B6DA946376796F2D67EB92118AE5DA_1606733557324_Screenshotfrom2020-11-3016-21-50.png?resize=1273%2C793&ssl=1)

Our directory of optimized images

This [GitHub repo](https://github.com/ravgeetdhillon/create-optimize-images) has all the images we’re using and you’re welcome to grab them and follow along.

### Set up

Before we start, let’s get all of our dependencies in order. Again, we’re writing Bash scripts, so we’ll be spending time in the command line.

Here are the commands for all of the dependencies we need to start optimizing images:

    sudo apt-get update
    sudo apt-get install imagemagick webp jpegoptim optipng
    npm install -g svgexport svgo

It’s a good idea to know what we’re working with before we start using them:

*   [ImageMagick](https://github.com/tjko/jpegoptim): works with all kinds of raster images
*   [webp](https://developers.google.com/speed/webp) optimizes WebP files
*   [JPEGoptim](https://github.com/tjko/jpegoptim) optimizes JPG/JPEG files
*   [OptiPNG](https://linux.die.net/man/1/optipng) optimizes PNG files
*   [SVGO](https://github.com/svg/svgo) and [svgexport](https://github.com/shakiba/svgexport) are Node packages that optimize SVG assets

OK, we have our images in the `original-images` directory from the GitHub repo. You can follow along at commit [3584f9b](https://github.com/ravgeetdhillon/create-optimize-images/tree/3584f9b00380aac7c60a87427029500a04a20592).

**Note:** It is strongly recommended to backup your images before proceeding. We’re about to run programs that alter these images, and while we plan to leave the originals alone, one wrong command might change them in some irreversible way. So back anything up that you plan to use on a real project to prevent cursing yourself later.

### Organize images

OK, we’re technically set up. But before we jump into optimizing all the things, we should organize our files a bit. Let’s organize them by splitting them up into different sub-directories based on their MIME type. In fact, we can create a new bash to do that for us!

The following code creates a script called `organize-images.sh`:

    #!/bin/bash
    
    input_dir="$1"
    
    if [[ -z "$input_dir" ]]; then
      echo "Please specify an input directory."
      exit 1
    fi
    
    for img in $( find $input_dir -type f -iname "*" );
    do
      # get the type of the image
      img_type=$(basename `file --mime-type -b $img`)
    
      # create a directory for the image type
      mkdir -p $img_type
    
      # move the image into its type directory
      rsync -a $img $img_type
    done

This might look confusing if you’re new to writing scripts, but what it’s doing is actually pretty simple. We give the script an input directory where it looks for images. the script then goes into that input directory, looks for image files and identifies their MIME type. Finally, it creates subdirectories in the input folder for each MIME type and drops a copy of each image into their respective sub-directory.

Let’s run it!

    bash organize-images.sh original-images

Sweet. The directory looks [like this now](https://github.com/ravgeetdhillon/create-optimize-images/tree/eee86463d5a4918d52aa8e3a7cef4cd0cdb5e729). Now that our images are organized, we can move onto creating variants of each image. We’ll tackle one image type at a time.

### Convert to PNG

We will convert three types of images into PNG in this tutorial: WebP, JPEG, and SVG. Let’s start by writing a script called `webp2png.sh`, which pretty much says what it does: convert WebP files to PNG files.

    #!/bin/bash
    
    # directory containing images
    input_dir="$1"
    
    if [[ -z "$input_dir" ]]; then
      echo "Please specify an input directory."
      exit 1
    fi
    
    # for each webp in the input directory
    for img in $( find $input_dir -type f -iname "*.webp" );
    do
      dwebp $img -o ${img%.*}.png
    done

Here’s what happening:

*   `input_dir="$1"`: Stores the command line input to the script
*   `if [[ -z "$input_dir" ]]; then`: Runs the subsequent conditional if the input directory is not defined
*   `for img in $( find $input_dir -type f -iname "*.webp" );`: Loops through each file in the directory that has a `.webp` extension.
*   `dwebp $img -o ${img%.*}.png`: Converts the WebP image into a PNG variant.

And away we go:

    bash webp2png.sh webp

We now have our [PNG images in the `webp` directory](https://github.com/ravgeetdhillon/create-optimize-images/tree/76ff80a36ac69ad96e93963e30adac4acfda6a5f/webp). Next up, let’s convert JPG/JPEG files to PNG with another script called `jpg2png.sh`:

    #!/bin/bash
    
    # directory containing images
    input_dir="$1"
    
    if [[ -z "$input_dir" ]]; then
      echo "Please specify an input directory."
      exit 1
    fi
    
    # for each jpg or jpeg in the input directory
    for img in $( find $input_dir -type f -iname "*.jpg" -o -iname "*.jpeg" );
    do
      convert $img ${img%.*}.png
    done

This uses the `convert` command provided by the ImageMagick package we installed. Like the last script, we provide an input directory that contains JPEG/JPG images. The script looks in that directory and creates a PNG variant for each matching image. If you look closely, we have added `-o -iname "*.jpeg"` in the `find`. This refers to Logical OR, which is the script that finds all the images that have either a `.jpg` or `.jpeg` extension.

Here’s how we run it:

    bash jpg2png.sh jpeg

Now that we have [our PNG variants from JPG](https://github.com/ravgeetdhillon/create-optimize-images/tree/76ff80a36ac69ad96e93963e30adac4acfda6a5f/jpeg), we can do the exact same thing for SVG files as well:

    #!/bin/bash
    
    # directory containing images
    input_dir="$1"
    
    # png image width
    width="$2"
    
    if [[ -z "$input_dir" ]]; then
      echo "Please specify an input directory."
      exit 1
    elif [[ -z "$width" ]]; then
      echo "Please specify image width."
      exit 1
    fi
    
    # for each svg in the input directory
    for img in $( find $input_dir -type f -iname "*.svg" );
    do
      svgexport $img ${img%.*}.png $width:
    done

This script has a new feature. Since SVG is a scalable format, we can specify the `width` directive to scale our SVGs up or down. We use the `svgexport` package we installed earlier to convert each SVG file into a PNG:

    bash svg2png.sh svg+xml

Commit [76ff80a](https://github.com/ravgeetdhillon/create-optimize-images/tree/76ff80a36ac69ad96e93963e30adac4acfda6a5f) shows the result in the repo.

We’ve done a lot of great work here by [creating a bunch of PNG files](https://github.com/ravgeetdhillon/create-optimize-images/tree/76ff80a36ac69ad96e93963e30adac4acfda6a5f/svg+xml) based on other image formats. We still need to do the same thing for the rest of the image formats before we get to the real task of optimizing them.

### Convert to JPG

Following in the footsteps of PNG image creation, we will convert WebP, JPEG, and SVG into JPG. Let’s start by writing a script called `png2jpg.sh` that converts PNG to SVG:

    #!/bin/bash
    
    # directory containing images
    input_dir="$1"
    
    # jpg image quality
    quality="$2"
    
    if [[ -z "$input_dir" ]]; then
      echo "Please specify an input directory."
      exit 1
    elif [[ -z "$quality" ]]; then
      echo "Please specify image quality."
      exit 1
    fi
    
    # for each png in the input directory
    for img in $( find $input_dir -type f -iname "*.png" );
    do
      convert $img -quality $quality% ${img%.*}.jpg
    done

You might be noticing a pattern in these scripts by now. But this one introduces a new power where we can set a `-quality` directive to convert PNG images to JPG images. Rest is the same.

And here’s how we run it:

    bash png2jpg.sh png 90

Woah. We now have [JPG images in our `png` directory](https://github.com/ravgeetdhillon/create-optimize-images/tree/884c6cff68d42c574d7266595ee6ff4260d5590b/png). Let’s do the same with a `webp2jpg.sh` script:

    #!/bin/bash
    
    # directory containing images
    input_dir="$1"
    
    # jpg image quality
    quality="$2"
    
    if [[ -z "$input_dir" ]]; then
      echo "Please specify an input directory."
      exit 1
    elif [[ -z "$quality" ]]; then
      echo "Please specify image quality."
      exit 1
    fi
    
    # for each webp in the input directory
    for img in $( find $input_dir -type f -iname "*.webp" );
    do
      # convert to png first
      dwebp $img -o ${img%.*}.png
    
      # then convert png to jpg
      convert ${img%.*}.png -quality $quality% ${img%.*}.jpg
    done

Again, this is the same thing we wrote for converting WebP to PNG. However, there is a twist. We cannot convert WebP format directly into a JPG format. Hence, we need to get a little creative here and convert WebP to PNG using `dwebp` and _then_ convert PNG to JPG using `convert`. That is why, in the `for` loop, we have two different steps.

Now, let’s run it:

    bash webp2jpg.sh jpeg 90

_Voilà!_ We have created [JPG variants for our WebP images](https://github.com/ravgeetdhillon/create-optimize-images/tree/884c6cff68d42c574d7266595ee6ff4260d5590b/webp). Now let’s tackle SVG to JPG:

    #!/bin/bash
    
    # directory containing images
    input_dir="$1"
    
    # jpg image width
    width="$2"
    
    # jpg image quality
    quality="$3"
    
    if [[ -z "$input_dir" ]]; then
      echo "Please specify an input directory."
      exit 1
    elif [[ -z "$width" ]]; then
      echo "Please specify image width."
      exit 1
    elif [[ -z "$quality" ]]; then
      echo "Please specify image quality."
      exit 1
    fi
    
    # for each svg in the input directory
    for img in $( find $input_dir -type f -iname "*.svg" );
    do
        svgexport $img ${img%.*}.jpg $width: $quality%
    done

You might bet thinking that you have seen this script before. You have! We used the same script for to create PNG images from SVG. The only addition to this script is that we can specify the `quality` directive of our JPG images.

    bash svg2jpg.sh svg+xml 512 90

Everything we just did is contained in commit [884c6cf](https://github.com/ravgeetdhillon/create-optimize-images/tree/884c6cff68d42c574d7266595ee6ff4260d5590b/svg%2Bxml) in the repo.

### Convert to WebP

WebP is an image format designed for modern browsers. At the time of this writing, it enjoys [roughly 90% global browser support](https://caniuse.com/webp), including with partial support in Safari. WebP’s biggest advantage is it’s a much smaller file size compared to other mage formats, without sacrificing any visual quality. That makes it a good format to serve to users.

But enough talk. Let’s write a `png2webp.sh` that — you guessed it — creates WebP images out of PNG files:

    #!/bin/bash
    
    # directory containing images
    input_dir="$1"
    
    # webp image quality
    quality="$2"
    
    if [[ -z "$input_dir" ]]; then
      echo "Please specify an input directory."
      exit 1
    elif [[ -z "$quality" ]]; then
      echo "Please specify image quality."
      exit 1
    fi
    
    # for each png in the input directory
    for img in $( find $input_dir -type f -iname "*.png" );
    do
      cwebp $img -q $quality -o ${img%.*}.webp
    done

This is just the reverse of the script we used to create PNG images from WebP files. Instead of using `dwebp`, we use `cwebp`.

    bash png2webp.sh png 90

We have [our WebP images](https://github.com/ravgeetdhillon/create-optimize-images/tree/6625f26be0f0c057469cef8280c01b36349b7aab/png). Now let’s convert JPG images. The tricky thing is that there is no way to directly convert a JPG files into WebP. So, we will first convert JPG to PNG and then convert the intermediate PNG to WebP in our `jpg2webp.sh` script:

    #!/bin/bash
    
    # directory containing images
    input_dir="$1"
    
    # webp image quality
    quality="$2"
    
    if [[ -z "$input_dir" ]]; then
      echo "Please specify an input directory."
      exit 1
    elif [[ -z "$quality" ]]; then
      echo "Please specify image quality."
      exit 1
    fi
    
    # for each webp in the input directory
    for img in $( find $input_dir -type f -iname "*.jpg" -o -iname "*.jpeg" );
    do
      # convert to png first
      convert $img ${img%.*}.png
    
      # then convert png to webp
      cwebp ${img%.*}.png -q $quality -o ${img%.*}.webp
    done

Now we can use it like this to get our [WebP variations of JPG files](https://github.com/ravgeetdhillon/create-optimize-images/tree/6625f26be0f0c057469cef8280c01b36349b7aab/jpeg):

    bash jpg2webp.sh jpeg 90

Commit [6625f26](https://github.com/ravgeetdhillon/create-optimize-images/tree/6625f26be0f0c057469cef8280c01b36349b7aab) shows the result.

### Combining everything into a single directory

Now that we are done converting stuff, we’re one step closer to optimize our work. But first, we’re gong to bring all of our images back into a single directory so that it is easy to optimize them with fewer commands.

Here’s code that creates a new bash script called `combine-images.sh`:

    #!/bin/bash
    
    input_dirs="$1"
    output_dir="$2"
    
    if [[ -z "$input_dirs" ]]; then
      echo "Please specify an input directories."
      exit 1
    elif [[ -z "$output_dir" ]]; then
      echo "Please specify an output directory."
      exit 1
    fi
    
    # create a directory to store the generated images
    mkdir -p $output_dir
    
    # split input directories comma separated string into an array
    input_dirs=(${input_dirs//,/ })
    
    # for each directory in input directory
    for dir in "${input_dirs[@]}"
    do
      # copy images from this directory to generated images directory
      rsync -a $dir/* $output_dir/
    done

The first argument is a comma-separated list of input directories that will transfer images to a target combined directory. The second argument is defines that combined directory.

    bash combine-images.sh jpeg,svg+xml,webp,png generated-images

The final output can be seen [in the repo](https://github.com/ravgeetdhillon/create-optimize-images/tree/ca9e34e40453cd469c6f1990108d9a8bfa5dc69f/generated-images).

### Optimize SVG

Let us start by optimizing our SVG images. Add the following code to `optimize-svg.sh`:

    #!/bin/bash
    
    # directory containing images
    input_dir="$1"
    
    if [[ -z "$input_dir" ]]; then
    echo "Please specify an input directory."
    exit 1
    fi
    
    # for each svg in the input directory
    for img in $( find $input_dir -type f -iname "*.svg" );
    do
      svgo $img -o ${img%.*}-optimized.svg
    done

We’re using the SVGO package here. It’s got a lot of options we can use but, to keep things simple, we’re just sticking with the default behavior of optimizing SVG files:

    bash optimize-svg.sh generated-images

![](https://i2.wp.com/css-tricks.com/wp-content/uploads/2020/12/s_FA3C3321F9CAFCD916B8768871CA8981B9B6DA946376796F2D67EB92118AE5DA_1606729556194_Screenshotfrom2020-11-2914-36-11.png?resize=714%2C239&ssl=1)

This gives us a 4KB saving on each image. Let’s say we were serving 100 SVG icons — we just saved 400KB!

The result can be seen in the repo at commit [75045c3](https://github.com/ravgeetdhillon/create-optimize-images/tree/75045c3d7934dd7fb2b5a13760e7850ef76078bc).

### Optimize PNG

Let’s keep rolling and optimize our PNG files using this code to create an `optimize-png.sh` command:

    #!/bin/bash
    
    # directory containing images
    input_dir="$1"
    
    if [[ -z "$input_dir" ]]; then
      echo "Please specify an input directory."
      exit 1
    fi
    
    # for each png in the input directory
    for img in $( find $input_dir -type f -iname "*.png" );
    do
      optipng $img -out ${img%.*}-optimized.png
    done

Here, we are using the OptiPNG package to optimize our PNG images. The script looks for PNG images in the input directory and creates an optimized version of each one, appending `-optimized` to the file name. There is one interesting argument, `-o`, which we can use to specify the optimization level. The default value is `2` \*\*and values range from 0 to 7. To optimize our PNGs, we run:

    bash optimize-png.sh generated-images

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/12/s_FA3C3321F9CAFCD916B8768871CA8981B9B6DA946376796F2D67EB92118AE5DA_1606729794569_Screenshotfrom2020-11-2914-37-50.png?resize=714%2C455&ssl=1)

PNG optimization depends upon the information stored in the image. Some images can be greatly optimized while some show little to no optimization.

As we can see, OptiPNG does a great job optimizing the images. We can play around with the `-o` argument to find a suitable value by trading off between image quality and size. Check out the results in commit [4a97f29](https://github.com/ravgeetdhillon/create-optimize-images/tree/4a97f29947bd66a09785cbec4d54cce70ae649f8).

### Optimize JPG

We have reached the final part! We’re going to wrap things up by optimizing JPG images. Add the following code to `optimize-jpg.sh`:

    #!/bin/bash
    
    # directory containing images
    input_dir="$1"
    
    # target image quality
    quality="$2"
    
    if [[ -z "$input_dir" ]]; then
      echo "Please specify an input directory."
      exit 1
    elif [[ -z "$quality" ]]; then
      echo "Please specify image quality."
      exit 1
    fi
    
    # for each jpg or jpeg in the input directory
    for img in $( find $input_dir -type f -iname "*.jpg" -o -iname "*.jpeg" );
    do
      cp $img ${img%.*}-optimized.jpg
      jpegoptim -m $quality ${img%.*}-optimized.jpg
    done

This script uses JPEGoptim. The problem with this package is that it doesn’t have any option to specify the output file. We can only optimize the image file in place. We can overcome this by first creating a copy of the image, naming it whatever we like, then optimizing the copy. The `-m` argument is used to specify image quality. It is good to experiment with it a bit to find the right balance between quality and file size.

    bash optimize-jpg.sh generated-images 95

![](https://i2.wp.com/css-tricks.com/wp-content/uploads/2020/12/s_FA3C3321F9CAFCD916B8768871CA8981B9B6DA946376796F2D67EB92118AE5DA_1606729808381_Screenshotfrom2020-11-2914-40-47.png?resize=714%2C473&ssl=1)

The results are shows in commit [35630da](https://github.com/ravgeetdhillon/create-optimize-images/tree/35630da6db2775c5ae25a290d8358a9ae052dde8).

### Wrapping up

See that? With a few scripts, we can perform heavy-duty image optimizations right from the command line, and use them on any project since they’re installed globally. We can set up CI/CD pipelines to create different variants of each image and serve them using valid HTML, APIs, or even set up our own image conversion websites.

I hope you enjoyed reading and learning something from this article as much as I enjoyed writing it for you. Happy coding!
