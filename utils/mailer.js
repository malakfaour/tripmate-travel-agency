const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,  // REQUIRED for Gmail App Passwords!
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendAdvisorEmail({ fullName, email, subject, message }) {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.SMTP_USER}>`,
      to: process.env.FROM_EMAIL,
      subject: `New Advisor Message: ${subject}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log("📩 Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Email Error:", error);
    throw error;
  }
}

module.exports = { sendAdvisorEmail };
