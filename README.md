![TSC logo](https://raw.githubusercontent.com/wellcometrust/together-science-can/master/static/images/icons/android-chrome-256x256.png)

[togethersciencecan.org](togethersciencecan.org)

# Together Science Can

This is a single-page site for the *Together Science Can* campaign. It is designed as a static site generated from JSON, which means it's very lightweight and extensible.

## Requirements

+ Node.js v6.10+

## Development

+ all frontend code is located in the `components` directory
+ individual UI components are located in their own folders with a corresponding Nunjucks template, SCSS file and optionally an ES6 JavaScript module
+ `npm run build` will build the HTML/CSS/JS bundles. Append `:dev` for a faster, unoptimized build.
+ `npm run watch` will rebuild the HTML page and CSS/JS bundles if anything in `/components` changes
