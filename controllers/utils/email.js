var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mometrojetpackcompose@gmail.com",
    pass: "eukc mfeo jhmg gjkq",
  },
});

var mailOptions = {
  from: "mometrojetpackcompose@gmail.com",
  to: "rabill785@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
