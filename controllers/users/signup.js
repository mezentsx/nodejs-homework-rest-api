const { User } = require("../../models/index");
const { createError, sendEmail } = require("../../helpers/index");
const gravatar = require("gravatar");
const { generate } = require('shortid');

const signup = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError( 409, `User with "${email}" is already registered`);
  }
  
  const avatarURL = gravatar.url(email);
  const verificationToken = generate();

  const newUser = new User({ name, email, subscription, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();
  sendEmail(newUser);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name,
        email,
        subscription,
        avatarURL,
        verificationToken
      },
    },
  });
};

module.exports = signup;