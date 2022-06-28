const express = require('express');
const { ctrlWrapper, validation } = require("../../middlewares/index");
const { joiContactSchema, joiStatusSchema } = require("../../models/index");
const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers");

const router = express.Router()

router.get("/", ctrlWrapper(getAllContacts));

router.get("/:contactId", ctrlWrapper(getContactById));

router.post("/", validation(joiContactSchema), ctrlWrapper(addContact));

router.delete("/:contactId", ctrlWrapper(removeContact));

router.put("/:contactId", validation(joiContactSchema), ctrlWrapper(updateContact));

router.patch("/:contactId/favorite", validation(joiStatusSchema, "missing field favorite"), ctrlWrapper(updateStatusContact));

module.exports = router;

