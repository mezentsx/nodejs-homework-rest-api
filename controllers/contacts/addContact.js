const { Contact } = require("../../models/index");

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.json({ status: 201, message: "success", data: result });
};

module.exports = addContact;