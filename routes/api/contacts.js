const express = require('express');
const { auth, ctrlWrapper, validation } = require("../../middlewares/index");
const { joiContactSchema, joiStatusSchema } = require("../../models/index");
const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts/index");

const router = express.Router()

router.get("/", auth, ctrlWrapper(getAllContacts));

router.get("/:contactId", auth, ctrlWrapper(getContactById));

router.post("/", auth, validation(joiContactSchema), ctrlWrapper(addContact));

router.delete("/:contactId", auth, ctrlWrapper(removeContact));

router.put("/:contactId", auth, validation(joiContactSchema), ctrlWrapper(updateContact));

router.patch("/:contactId/favorite", auth, validation(joiStatusSchema, "missing field favorite"), ctrlWrapper(updateStatusContact));

module.exports = router;

