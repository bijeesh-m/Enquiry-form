const express = require("express");
const sendMail = require("./utils/mailer");

const cors = require("cors");

const app = express();

app.use(express.json()); // Parse JSON request bodies

require("dotenv").config();

app.use(cors());

app.post("/send-email", async (req, res) => {
    const { subject, email, message } = req.body;

    try {
        const info = await sendMail(subject, email, message);
        console.log(info);
        res.status(200).json({ message: "Email sent successfully", info });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(4000, (err) => {
    console.log("Server is running");
});
