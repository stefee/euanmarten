# euanmarten

This is the Next.js app serving [euanmarten.com](https://euanmarten.com).

This project was migrated from a Create React App project. See source code for that project [here](https://github.com/srilq/euanmarten-cra).

## Updating the content on the website

You should start by uploading any new images to the [`images`](images) folder.

The content on the website is contained in the [`content.json5`](content.json5) file. You can edit this file in GitHub and commit your changes to a branch. If you open a Pull Request for your branch, your changes will be made available on a "preview" version of the website hosted on Vercel. The preview link should appear automatically as a comment on the Pull Request from [Vercel Bot](https://vercel.com/docs/git-integrations/vercel-for-github).

![Vercel Bot comment on a PR](https://user-images.githubusercontent.com/18026180/91591927-a7819200-e955-11ea-80ad-31bb2787be5f.png)

Once you have previewed the changes and you are happy with them, merge the changes into the main code branch by pressing the merge button at the bottom of the Pull Request page. The changes will automatically go live on the real website.

## Updating an existing image

If you want to update an image that is already on the website, you should create a copy of it with a different name, and upload it to the [`images`](images) folder as if it were a new image, and then update the [`content.json5`](content.json5) file to point to the new version of the image. You can then either delete the old version of the image from GitHub or leave it – it doesn't matter.

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

# Install package.json
npm install --prefer-online
```

### Build Images

```sh
npm run build-images
```

### Start Server

```sh
npm run dev
```
