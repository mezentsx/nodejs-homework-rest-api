const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const createError = require("./createError");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (user) => {
  try {
    const { email, verificationToken } = user;

    const mail = {
      from: "75064291890x@gmail.com",
      to: email,
      subject: "Verification your e-mail",
      html: `<a href="http://localhost:3000/api/users/verification/${verificationToken}">Click to verification</a>`,
    };

    await sgMail.send(mail);
    return true;
  } catch (error) {
    createError(400, error.message);
  }
};

module.exports = sendEmail;