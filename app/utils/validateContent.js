const AJV = require('ajv');
const validator = new AJV();
const v4MetaSchema = require('ajv/lib/refs/json-schema-draft-04.json');
validator.addMetaSchema(v4MetaSchema);

/**
 * Validates the given content object with the given JSON schema
 *
 * @param      {object}  content  The content object
 * @param      {object}  schema   The JSON schema
 * @return     {Array}   [ isValid: boolean, errors: object ]
 */
module.exports = function(content, schema) {
  return [
    validator.validate(schema, content),
    validator.errors
  ];
}
