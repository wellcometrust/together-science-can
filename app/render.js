const nunjucks = require('nunjucks');

nunjucks.configure({ autoescape: true, throwOnUndefined: true });

module.exports = function render(template, data) {
  return nunjucks.render(template, data);
};
