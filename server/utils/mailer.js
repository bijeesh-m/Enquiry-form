const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter
const transporter = nodemailer.createTransport({
    service: "gmail", // You can use other services like Yahoo, Outlook, etc.
    auth: {
        user: process.env.ADMIN_EMAIL, // Email from .env
        pass: process.env.ADMIN_PASSWORD, // Password from .env
    },
});

// Function to send mail
const sendMail = async (subject, to, text) => {
    try {
        const mailOptions = {
            from: `"${to}" <mernpmna3@gmail.com>`,
            to: "mernpmna3@gmail.com",
            subject,
            text,
        };
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw error;
    }
};

module.exports = sendMail;
