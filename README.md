# Together Science Can

This is a single-page site for the *Together Science Can* campaign. Unlike most other Wellcome sites, this one is designed as a static site generated from JSON, which means it's very lightweight and extensible.

## Requirements

+ Node.js v6.10+
+ Terraform

## Development

+ all frontend code is located in the `components` directory
+ individual UI components are located in their own folders with a corresponding Nunjucks template, SCSS file and optionally an ES6 JavaScript module
+ `npm run build:[type]` will build a part of the codebase, where `[type]` is `html` or `cssjs`. Append `:dev` for a faster, unoptimized build of CSS/JS.
+ `npm run watch` will rebuild the HTML page and CSS/JS bundles if anything in `/components` changes
