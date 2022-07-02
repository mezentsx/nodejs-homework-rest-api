const { User } = require("../../models/index");
const path = require("path");
const fs = require("fs/promises");

const { createError, resizeAvatar } = require("../../helpers/index");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file; 
  const { _id: id } = req.user;
  const avatarName = `${id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, avatarName);
 
  try {
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", avatarName);
    await User.findByIdAndUpdate(req.user.id, { avatarURL });

    resizeAvatar(avatarURL);
    res.status(200).json({
      status: "success",
      code: 200,
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    return createError(error);
  }
};

module.exports = updateAvatar;