const fs = require('fs');
const path = require('path');

const content = require('./content/tsc.json');
const render = require('./app/render.js');

const OUTPUT_FILE_NAME = 'index.html';

const hash = Date.now();
const html = render('./components/index.njk', Object.assign(content, { hash }));

fs.writeFile(
  path.join(__dirname, 'dist', OUTPUT_FILE_NAME),
  html,
  err => {
    if (err)  throw err;
    else      process.stdout.write(hash.toString());
  }
);
