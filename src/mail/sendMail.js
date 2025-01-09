//importing modules
const nodemailer = require("nodemailer");

const sendMail = (email) => {
  // Step 1
  var Transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions;
  let sender = "WatchUrPark";
  mailOptions = {
    from: sender,
    to: email,
    subject: "Email Verification",
    text: "Cliquer sur le lien pour vérifier votre email : <a href='http://localhost:3000/api/auth/verify/${user.id}/${token}'></a>",
  };

  // Step 3
  Transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log("Error", error);
    } else {
      console.log("Email sent");
    }
  });
};
