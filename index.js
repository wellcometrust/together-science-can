const fs = require('fs');
const path = require('path');

const content = require('./content/tsc.json');
const render = require('./app/render.js');

const OUTPUT_FILE_NAME = 'index.html';

const html = render(content);

fs.writeFile(
  path.join(__dirname, 'build', OUTPUT_FILE_NAME),
  html,
  err => {
    if (err)  throw err;
    else      console.log(`Generated ${OUTPUT_FILE_NAME}.`);
  }
);
