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

exports.sendConfirmationEmail = (fullname, email) => {
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
    .catch(err => console.log(err));
};

exports.sendDeletionEmail = (fullname, email) => {
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

exports.sendUpdateEmail = (fullname, email) => {
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

exports.sendFormEmail = (fullname, email) => {
  transport
    .sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Pizza Planet enquiry",
      html: `
              <h2> Hello ${fullname} </h2>
              <p>We have received your contact request. Expect a response from one of our customer agents within the next 48 - 72 hours </p>
          `
    })
}




