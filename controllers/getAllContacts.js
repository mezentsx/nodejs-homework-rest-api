const { Contact } = require("../models/index");

const getAllContacts = async (_, res) => {
  const contacts = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = getAllContacts;