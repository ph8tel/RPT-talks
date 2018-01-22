'use strict';

const express = require('express');
const router = express.Router()

const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

router.post('/send/', function(req, res){
  let message = req.body
nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'rs5.websitehostserver.net',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'signups@ph8l.co',
            pass: 'hackreactor'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'Joe Jackson', // sender address
        to: 'joe@ph8l.co',  // list of receivers
        subject: 'New signup', // Subject line
        text: 'New signup to present from ' + message.author + 'wants to present on ' + message.subject, // plain text body
        html: `<h1>New Request to Present</h1> <br />
              <h3>From</h3><br />
              <h2>${message.author}</h2>
              <h3>Want to Present About:</h3><br />
              <p>${message.subject}</p>
              <br />
              <h3>When:</h3><br />
              <p>${message.when}</p>
              <h3>Description</h3>
              <p>${message.body.replace('\n', '<br />')}</p>
               `// html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
res.json(info)
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});

})

router.post('/request/', function(req, res){
  let message = req.body
nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'rs5.websitehostserver.net',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'signups@ph8l.co',
            pass: 'hackreactor'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'Joe Jackson <singup@ph8l.co>', // sender address
        to: 'joe@ph8l.co',  // list of receivers
        subject: 'New signup', // Subject line
        text: 'New request for topic. ' + message.author + 'wants to present on ' + message.subject, // plain text body
        html: `<h1>New Request for Topic</h1> <br />
              <h4>From</h4><br />
              <h3>${message.author}</h3>
              <h4>Want to Know About:</h4><br />
              <h3>${message.subject}</h3>
              <br />
              <h4>When:</h4><br />
              <h3>${message.when}</h3>
              <h4>Description</h4>
              <h3>${message.body.replace('\n', '<br />')}</h3>
               `// html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
res.json(info)
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});

})


module.exports = router