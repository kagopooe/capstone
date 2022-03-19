const req = require("express/lib/request");
const nodemailer = require("nodemailer");
// const { user } = require("../models");
// const User = require("../models/user.model");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
});

module.exports.sendConfirmationEmail = (fullname, email) => {
  transport
    .sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "PizzaWorld Successful Registration",
      html: `   <h2> Hello ${ fullname }!</h2>
                    <p> Thank you for joining us aboard to PizzaWorld ! </p>
                    <p> Make your first order with us  <a href: "">here</a>!</p>
                    `
    })
    .catch((err) => console.log(err));
};

module.exports.sendDeletionEmail = (fullname, email) => {
    console.log(fullname, email)
  transport
        .sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "PizzaWorld Account Deletion",
            html: `
                    <h2> Hello ${ fullname }!</h2>
                        <p> Your PizzaWorld account was successfully deleted</p>
                        <p> We're sad to see you depart :(
                `
        })
}

module.exports.sendUpdateEmail = (fullname, email) => {
  transport
    .sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "PizzaWorld Account Updated",
      html: `
              <h2> Hello ${ fullname }</h2>
                  <p> Your PizzaWorld account details were successfully updated </p>
                  <p> Explore PizzaWorld further at <a href"#">here</a>!</p>
      `
    })
}
// const welcomeMsg = {
//     from: process.env.EMAIL,
//     to: req.body.email,
//     subject: "Welcome to PizzaWorld!",
//     text: "Your PizzaWorld account was registered successfully! We're glad to have you aboard the spaceship"
// };

// const goodbyeMsg = {
//     from: process.env.EMAIL,
//     to: req.body.email,
//     subject: "PizzWorld Account deletion",
//     text: "PizzaWorld account successfully deleted. We're sad to see you go :( "
// }

// const updateMsg = {
//  from: process.env.EMAIL,
//  to: req.body.email,
//  subject: "PizzaWorld Account updated!",
//  text: "Your PizzaWorld account was updated successfully"
// }
