const { User } = require("../../models/index");
const { createError } = require("../../helpers/index");

const verificationToken = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw createError(404, "User is not found");
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification is successful",
  });
};

module.exports = verificationToken;