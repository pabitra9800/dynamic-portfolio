const express = require("express");
const nodemailer = require("nodemailer");
const db = require("../config/db"); // MySQL connection
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // 1️⃣ Save to database
    await db.query(
      "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );

    // 2️⃣ Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact Form: ${name}`,
      text: `
      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Message sent and saved successfully!" });
  } catch (err) {
    console.error("Error in contact route:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
});

module.exports = router;
