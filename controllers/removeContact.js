const { Contact } = require("../models/index");
const { createError } = require("../helpers/index");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw createError(404, `contact with id=${contactId} not found`);
  }
  res.json({ status: 200, message: "contact deleted", data: result });
};

module.exports = removeContact;