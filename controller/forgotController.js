'use strict';

const nodeMailer = require('nodemailer');
const { generateRandomVal } = require('../handler/generateRandomValue');
const Forget = require('../model/Forget');

module.exports = {
  forgotPass: (req, res) => {
    res.render('auth/forgotpass', {
      title: 'Forgot Password',
      authentication: typeof req.session.userid === 'undefined' ? false : req.session.userid,
      layout: 'layouts/auth-layouts',
    });
  },
  sendEmail: async function (req, res) {

    await Forget.getAccountByEmail(req.con, req.body.email, (err, result) => {
      if(result === null) {
        res.render('auth/forgotpass', {
          message: 'User not Registered, please register',
          layout: 'layouts/auth-layouts',
        });
        return false;
      } else {
        const randomVal = generateRandomVal(30);
        const shareLink = `${req.protocol}://${req.get('host')}/auth/reset/${randomVal}`;
        Forget.insertGenerateValue(req.con, {
          email: req.body.email,
          randomValue: randomVal,
          shareLink: shareLink,
        }, (err, result) => {
          if(err) {
            console.log(err);
          }
        });
      }
    });


    await Forget.getGenerateValue(req.con, req.body.email, (err, result) => {
      const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
      });
  
      const mailOptions = {
        from: 'aliefaditya2005@gmail.com',
        to: req.body.email,
        subject: 'Sending Email using Node.js',
        text: result.shareLink
      };
  
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    });

    res.render('auth/forgotpass', {
      title: 'Forgot Password',
      authentication: typeof req.session.userid === 'undefined' ? false : req.session.userid,
      layout: 'layouts/auth-layouts',
      msg: 'Please check your email to reset your password'
    });
  },

  resetPass: (req, res) => {
    res.render('auth/resetpass', {
      title: 'Reset Password',
      authentication: typeof req.session.userid === 'undefined' ? false : req.session.userid,
      layout: 'layouts/auth-layouts',
    });
  }

}