const sgMail = require("@sendgrid/mail");
const { NotFoundError, CustomAPIError } = require("../errors");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const SendMail = async ({ email, token }) => {
  const msg = {
    to: email,
    from: "devhubbbb@gmail.com",
    subject: "Reset Your Password",
    html: `<div>Click on this link to Reset your password ${token}</div>`,
  };
  let success = "Reset password email sent";

  try {
    await sgMail.send(msg);
  } catch (error) {
    throw new CustomAPIError("Password reset email could not be sent");
  }
  return success;
};

module.exports = { SendMail };
