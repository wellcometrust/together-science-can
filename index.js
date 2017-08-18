const fs = require('fs');
const path = require('path');

const content = require('./content/tsc.json');
const schema = require('./content/tsc.schema.json');
const validateContent = require('./app/utils/validateContent.js');

const [ isValid, errors ] = validateContent(content, schema);

if (!isValid) {
  throw new Error(`
Content data is invalid due to following problems:
${JSON.stringify(errors, null, 2)}
  `);
}

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
