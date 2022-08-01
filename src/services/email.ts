import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(to: string, subject: string, body: string): Promise<void> {
  logger.info({ msg: "Sending email (v2)", to, subject });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@acme-shop.com',
      to,
      subject,
      text: body,
    });
    logger.info({ msg: "Email sent successfully", to, subject });
  } catch (error) {
    logger.error({ msg: "Failed to send email", to, subject, error: String(error) });
    throw error;
  }
}

export async function sendEmailLegacy(to: string, subject: string, body: string): Promise<void> {
  console.log("Sending email via legacy SMTP");
  console.log("Email recipient:", to);
  console.log("Email subject:", subject);

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@acme-shop.com',
      to,
      subject,
      text: body,
    });
    console.log("Email sent successfully to", to);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
