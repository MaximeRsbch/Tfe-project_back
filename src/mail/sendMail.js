//importing modules
const nodemailer = require("nodemailer");

//function to send email to the user
module.exports.sendingMail = async ({ to, subject, text }) => {
  const from = process.env.MAIL_USERNAME;
  try {
    let mailOptions = {
      from,
      to,
      subject,
      text,
    };

    const transporter = nodemailer.createTransport({
      port: process.env.MAIL_PORT,
      host: process.env.MAIL_SERVER,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      secure: true,
    });

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
