const { User } = require("../../models/index");
const { createError, sendMail } = require("../../helpers/index");

const verifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(404, `User with ${email} is not found`);
  }
  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }

  sendMail(user);

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = verifyEmail;