from PIL import Image
import os


def resize_image(path_to_image, max_size=1600):
    """
    Resizes and optimizes the images for beter Web performance.
    """

    file_base_name, ext = os.path.splitext(path_to_image)

    if ext in ['.jpg', '.jpeg', '.png']:
        
        im = Image.open(path_to_image)
        width, height = im.size

        if height > max_size or width > max_size:

            if width > height:
                desired_width = max_size
                desired_height = height / (width/max_size)

            elif height > width:
                desired_height = max_size
                desired_width = width / (height/max_size)

            else:
                desired_height = max_size
                desired_width = max_size

            desired_height = int(desired_height)
            desired_width = int(desired_width)

            im_resized = im.resize((desired_width, desired_height))
            im_resized.save(path_to_image, quality=80)
        
        else:
            im.save(path_to_image, quality=80)


def main():
    base = 'assets/img'
    for root, dirs, files in os.walk(base):
        for f in files:
            im_path = os.path.join(root, f)
            resize_image(im_path)


if __name__ == '__main__':
    main()
