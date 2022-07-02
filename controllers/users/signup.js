const { User } = require("../../models");
const { createError } = require("../../helpers");
const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError( 409, `User with "${email}" is already registered`);
  }
  const avatarURL = gravatar.url(email);
  
  const newUser = new User({ name, email, subscription, avatarURL });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name,
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = signup;