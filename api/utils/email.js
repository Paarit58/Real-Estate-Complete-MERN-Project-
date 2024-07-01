import nodemailer from "nodemailer";
export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9512f39289b601",
      pass: "75d448c0e881c9",
    },
  });

  const mailOptions = {
    from: "parit.pokharel@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
