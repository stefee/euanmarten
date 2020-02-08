# euanmarten

This is the Next.js app serving [euanmarten.com].

This project was migrated from a Create React App project. See source code for that project [here](https://github.com/srilq/euanmarten-cra).

[euanmarten.com]: https://euanmarten.com

## How to add a new image to the home page

1. Upload the full-resolution image to [the `public/static/images` folder](/public/static/images). Note: for better web performance, use the JPEG format (`.jpg`) for complex images such as photos or scanned paintings, and use PNG format (`.png`) for simple images such as black text on a white background or digital drawings with solid colours.
2. Add the image to the `"image"` list in [the `images.json` file](/images.json), for example:
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
3. Add the image to the `"index"` list in [the `images.json` file](/images.json). This is the order in which the images will appear on the home page.
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
# Install node & npm
brew install nvm
nvm install
nvm install-latest-npm

# Install yarn
brew install yarn

# Install GraphicsMagick
brew install graphicsmagick

# Install now
npm i -g now

# Install package.json
yarn
```

### Start Server

```sh
now dev
```
