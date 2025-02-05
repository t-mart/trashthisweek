# Assets

## Bin Images

Contained are the source files for the bin images.

- `trash.jpg` - The image of the trash bin.
- `recycle.jpg` - The image of the recycle bin.
- `favicon.jpg` - The image of the favicon.

They have been optimized and output in  the `public/` directory with the
following commands:

```bash
magick trash.jpg -resize 500x -strip -quality 30 ../public/trash.webp
magick recycling.jpg -resize 500x -strip -quality 30 ../public/recycling.webp
magick favicon.jpg -resize 128x -strip -quality 30 ../public/favicon.webp
```
