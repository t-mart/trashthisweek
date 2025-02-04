# Assets

## Bin Images

Contained are the source files for the bin images.

- `trash.jpg` - The image of the trash bin.
- `recycle.jpg` - The image of the recycle bin.

They have been optimized in the `public/` directory with the following commands:

```bash
magick trash.jpg -resize 320x -strip -quality 30 ../public/trash.webp
magick recycling.jpg -resize 320x -strip -quality 30 ../public/recycling.webp
```
