const nunjucks = require('nunjucks');

nunjucks.configure('components', { throwOnUndefined: true });

module.exports = function render(template, data) {
  return nunjucks.render(template, data);
};
