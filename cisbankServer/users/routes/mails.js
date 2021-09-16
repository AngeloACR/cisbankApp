const express = require('express');
const mailRouter = express.Router();
const async = require('async');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const config = require('../../config/environment');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: config.contactMail, 
            pass: config.contactPass  
        }
    });

mailRouter.post('/', async (req, res, next) => {
	try {
		const username = req.body.username;
	
		let user = await User.setToken(username);
			
		var mailOptions = {
			from: '"Samaven" <info@adm-samaven.com>', // sender address
			to: user.mail, // list of receivers
			subject: 'Validación Samaven', // Subject line
			text: 'Bienvenido a Samaven!', // plaintext body
			html: '<b>'+user.validToken+'</b>' // html body
		};
	
		// send mail with defined transport object
		var sendMail = await transporter.sendMail(mailOptions);
		res.status(200).json(sendMail.response);
	
	  } catch (e) { 
		res.status(400).json(e.toString());
		}
});



// Validate user
mailRouter.post('/vUser', async (req, res, next) => {
	try {
		const token = req.body.token;
		const username = req.body.username;
	
		let isValid = await User.validateUser(username, token);
	
		const msg = ` ${req.originalUrl}`;
		res.status(200).json(isValid);
		
	} catch (e) { 
		res.status(400).json(e.toString());
	}
});

module.exports = mailRouter;