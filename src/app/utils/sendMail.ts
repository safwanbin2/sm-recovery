import nodemailer from "nodemailer";
import config from "../config";

export const sendMail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production", // `true` for port 465, `false` for all other ports
    auth: {
      user: "safwanridwan321@gmail.com",
      pass: "jrcv tcvx qkyx qpzd",
    },
  });

  await transporter.sendMail({
    from: "safwanridwan321@gmail.com", // sender address
    to, // list of receivers
    subject: "Reset your password within 10 minutes ✔", // Subject line
    text: "Change password", // plain text body
    html, // html body
  });
};
