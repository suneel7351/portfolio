import { createTransport } from "nodemailer";

export const sendEmail = async (message, email) => {
  const transport = createTransport({
    host: process.env.HOST,
    port: process.env.SERVICE_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transport.sendMail({
    subject: "Email from Portfolio",
    text: message,
    to: process.env.MAIL,
    from: email,
  });
};
