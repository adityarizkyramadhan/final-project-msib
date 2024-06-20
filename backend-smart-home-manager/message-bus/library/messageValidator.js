const jsonValidator = require("json-validator")
class MessageValidator {
  constructor() {
    this.schema = {};
    this.fieldName = "";
  }
  body = (field_name) => {
    this.fieldName = field_name;
    this.schema[this.fieldName] = { required: false }
    return this;
  };
  exists = () => {
    if (this.fieldName == "") throw "call body before anything else"
    this.schema[this.fieldName].required = true;
    return this
  }
}

const test = new MessageValidator();

console.log(test.body('password').exists());


module.exports = new MessageValidator();
