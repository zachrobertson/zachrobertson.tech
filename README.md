# [zachrobertson.tech](https://zachrobertson.tech)

This is a site built with gatsby, and designed by me!
It is layed out the same way as any other gatsby site but let me walk you through it.

## Running

To download and and run this site on your local machine, first make sure you have Node and the gatsby-cli installed then run:

1. `git clone https://github.com/zachrobertson/zachrobertson-tech.git`
2. `cd /zachrobertson-tech`
3. `npm install`
4. `gatsby develop`

## Layout

    .
    └── src
      └── components
        └── blog
            ├── blogContainer.js
            └── blogTemplate.js
        ├── footer.js
        ├── header.js
        ├── indexHeader.js
        ├── indexLayout.js
        ├── layout.js
        └── profile.js
      └── images
        ├── GitHubLogo.png
        ├── LinkedinLogo.png
        └── profile.jpg
      └── markdown-pages
        └── buildingGatsbySite.md
      └── pages
        ├── 404.js
        ├── blog.js
        ├── contact.js
        └── index.js
    ├── .gitignore
    ├── .prettierignore
    ├── .prettierrc
    ├── LICENSE
    ├── README.md
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── package-lock.json
    └── package.json
  
This is the typical layout of a Gatsby project, if you have not worked with gatsby before it would be best to go take a look at their quick-start [here](https://www.gatsbyjs.com/docs/quick-start/).

Below is a breakdown of what each file in the src directory and its sub-directories.

## Components

This directory holds all of the JavaScript files that produce reusable react components. This means these files can be imported and used to add new features or style to a page or another component.

### Blog

  Directory for all of the components to make and contain blogs on other pages of the site

- #### blogContainer.js

  > Used on the index and blog pages to hold excerpts of blog posts for clean display, linking, and eventually searching.

- #### blogTemplate.js

  > the only place this is referenced is in `gatsby-node.js` where it is used to produce all of the blog posts from their respective markdown files in the `/markdown-pages` sub-directory, this makes it very easy to add new blog posts with just one new markdown file.

### footer.js

> This is just a classic footer, imported in the layout component for easy use on all pages.

### header.js

> A non standard header. This is actually the left-side navbar and hamburger menu but it serves as my header. It is imported in the layout component for easy use on all pages.

### indexHeader.js

> A special version of the header to be used on the index page only. The only difference is the default showHeader variable is set to true instead of false.

### layout.js

> This is a react component to style all the pages in the same way. I use this is define global styling variables.

### indexLayout.js

> A special layout for the index page so that we can use the indexHeader component instead of the standard header. The only difference between this and the standard layout is the header. (Note: there is probably a better way to do this, but you can read about the reason for doing it this way instead of programmatically on my [blog](https://zachrobertson.tech/blog/build-a-gatsby-site/).

### profile.js

>A react component for the profile picture on the index page and blog posts.

## Images

This is just a directory to hold all the image files we might need. There is also a sub-directory for each blog post to help keep everything clean.

## Markdown-pages

Markdown files are used to automatically create blog posts, if we add a markdown file in this directory it will automatically create a blog post when we rebuild the site.

## Pages

This is the main file in our `src/` directory. If you are familiar with Gatsby you will be aware that for each file in our pages directory a page will be created at `yourcustomurl.xyz/page` where `page` is replaced by the name of the JS file (index is the home page, and sub-directory JS files do not create pages)

## To Do

1. Make site mobile friendly
2. Refactor some styled components to be more reusable and global
