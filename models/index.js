const {
    Contact, 
    contactSchema,
    joiContactSchema,
    joiStatusSchema 
  } = require("./contact");

  const {
    User,
    joiUserSchema,
    joiLoginSchema,
  } = require("./user");
  
  module.exports = {
    Contact, 
    contactSchema,
    joiContactSchema,
    joiStatusSchema, 
    User,
    joiUserSchema,
    joiLoginSchema,
  };