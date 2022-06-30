const { User } = require("../../models");
const { createError } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError( 409, `User with "${email}" is already registered`);
  }

  const newUser = new User(req.body);
  newUser.setPassword(password);

  const { subscription } = await newUser.save();
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = signup;