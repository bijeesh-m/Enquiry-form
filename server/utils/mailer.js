const nodemailer = require("nodemailer");

// Create a transporter
const transporter = nodemailer.createTransport({
    service: "gmail", // You can use other services like Yahoo, Outlook, etc.
    auth: {
        user: 'your_email',   // Email from .env
        pass: 'your_pass',   // Password from .env
    },
});

// Function to send mail
const sendMail = async (subject, from, text) => {
    try {
        const mailOptions = {
            from: from,
            to: 'your_email',
            subject,
            text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
        return info;
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw error;
    }
};

module.exports = sendMail;
