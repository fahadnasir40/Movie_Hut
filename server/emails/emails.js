"use strict"
const nodemailer = require('nodemailer');

const config = require("../config/config").get(process.env.NODE_ENV);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.MOVIEHUT_EMAIL_AUTH_USER,
        pass: config.MOVIEHUT_EMAIL_AUTH_SECRET
    },
});



// const mailOptions = {
//     from: config.MOVIEHUT_EMAIL_AUTH_USER,
//     to: `${emailParams.email}`,
//     subject: 'Link To Reset Password',
//     text:
//         'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
//         + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
//         + `http://localhost:3000/reset/${token}\n\n`
//         + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
// };

function getMessage(emailParams) {
    return {
        from: config.MOVIEHUT_EMAIL_AUTH_USER,
        to: `${emailParams.email}`,
        subject: 'Link To Reset Password',
        text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
            + `http://localhost:3000/reset/${emailParams.token}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    };
}

async function sendPasswordResetEmail(emailParams, token) {
    return await transporter.sendMail(await getMessage(emailParams, token), (err, response) => {
        if (err) {
            const message = 'Error sending password reset email';
            console.log("sending message: ", message)
            return message;
        }
        else {
            const message = 'Password reset email sent.';
            console.log("sending message: ", message)
            return message;
        }
    });
}



module.exports = {
    sendPasswordResetEmail
}