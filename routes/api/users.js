const express = require("express");
const { auth, ctrlWrapper, validation, upload } = require("../../middlewares/index");
const {
  joiUserSchema,
  joiLoginSchema
} = require("../../models/index");
const { 
    signup,
    login,
    getCurrent,
    logout,
    updateAvatar
} = require("../../controllers/users/index");

const router = express.Router();

router.post("/signup", validation(joiUserSchema), ctrlWrapper(signup));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(login));

router.get("/current", auth, ctrlWrapper(getCurrent));

router.get("/logout", auth, ctrlWrapper(logout));

router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(updateAvatar));

module.exports = router;