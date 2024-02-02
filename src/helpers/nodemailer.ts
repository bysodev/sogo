import nodemailer from 'nodemailer';

import { templateConfirmUser } from '@/emails/templateConfirmUser';
import { templateRecoveryPassword } from '@/emails/templateRecoveryPassword';
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

export const sendEmail = async (
  template: any,
  username: string,
  link: string,
  email: string,
  subject: string
) => {
  // const transport = transporter();
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    // secure: true,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  } as SMTPTransport.Options);
  // verify connection configuration
  transport.verify(function (error) {
    if (error) {
      console.error(error);
    }
  });
  const html = () => {
    switch (template) {
      case 'validate-email':
        return templateConfirmUser(link, username);
      case 'recovery-password':
        return templateRecoveryPassword(link, username);
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
