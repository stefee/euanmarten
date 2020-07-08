# euanmarten

This is the Next.js app serving [euanmarten.com].

This project was migrated from a Create React App project. See source code for that project [here](https://github.com/srilq/euanmarten-cra).

[euanmarten.com]: https://euanmarten.com

## How to add a new image to the home page

1. Upload the full-resolution image to [the `public/static/images` folder](/public/static/images).
    * Before uploading, rename the image to have a short filename like `oranges.jpg` or `bear.png`.
    * For better web performance, use the JPEG format (`.jpg`) for complex images such as photos or scanned paintings, and use PNG format (`.png`) for very simple images such as text on a solid background colour or digital drawings with solid colours and simple shapes.
2. Add the image to the `"images"` list in [the `images.json` file](/images.json), for example:
    ```json
    "images": [
      {
        "filename": "growing2.png",
        "altText": "Illustration: Still Growing"
      },
      {
        "filename": "point.jpg",
        "altText": "Illustration: Point"
      }
    ]
    ```
3. Add the image to the `"index"` list in [the `images.json` file](/images.json). This is the order in which the images will appear on the home page (aka. index page).
    ```json
    "index": [
      {
        "type": "image",
        "filename": "point.jpg"
      },
      {
        "type": "image",
        "filename": "growing2.png"
      }
    ]
    ```
4. Commit these changes to the `master` branch and they will automatically show up on the live site. ✨

## Quick Start for Developers

### Prerequisites

* macOS
* Homebrew

### Install

```sh
# Install nvm
brew install nvm

# Install node
nvm install

# Install now
npm i -g now

# Install package.json
npm install --prefer-online
```

### Start Server

```sh
now dev
```
