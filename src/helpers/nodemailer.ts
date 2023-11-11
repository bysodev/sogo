import nodemailer from 'nodemailer'

import {templateConfirmUser} from '@/emails/templateConfirmUser'
import SMTPTransport from 'nodemailer/lib/smtp-transport';


export const transporter = () => {
	const transport = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.EMAIL_SERVER_USER,
			pass: process.env.EMAIL_SERVER_PASSWORD,
		},
	} as SMTPTransport.Options);
	return transport;
};

export const sendEmail = async (template: any, username: string, link: string, email: string, subject: string) => {
	console.log({template, username, link, email, subject})
	console.log(process.env.EMAIL_SERVER_USER)
	console.log(process.env.EMAIL_SERVER_PASSWORD)
	// const transport = transporter();
	const transport = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		// secure: true,
		auth: {
			user: process.env.EMAIL_SERVER_USER,
			pass: process.env.EMAIL_SERVER_PASSWORD,
		},
	} as SMTPTransport.Options);
// verify connection configuration
	transport.verify(function (error, success) {
		if (error) {
		console.log(error);
		} else {
		console.log("Server is ready to take our messages");
		}
	});
	const html = () => {
		switch (template) {
			case 'validate-email':
				return templateConfirmUser(link, username);

			default:
				'No template';
		}
	};

	await transport.sendMail({
		from: process.env.EMAIL_SERVER_USER,
		to: email,
		subject,
		html: html(),
	});
};