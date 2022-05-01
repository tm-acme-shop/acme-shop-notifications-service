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

export interface EmailOptions {
  to: string;
  subject: string;
  body: string;
  html?: string;
  templateId?: string;
  templateData?: Record<string, unknown>;
}

export async function sendEmail(options: EmailOptions): Promise<void>;
export async function sendEmail(to: string, subject: string, body: string): Promise<void>;
export async function sendEmail(
  toOrOptions: string | EmailOptions,
  subject?: string,
  body?: string
): Promise<void> {
  const options: EmailOptions = typeof toOrOptions === 'string'
    ? { to: toOrOptions, subject: subject!, body: body! }
    : toOrOptions;

  logger.info({ msg: "Sending email (v2)", to: options.to, subject: options.subject });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@acme-shop.com',
      to: options.to,
      subject: options.subject,
      text: options.body,
      html: options.html,
    });
    logger.info({ msg: "Email sent successfully", to: options.to, subject: options.subject });
  } catch (error) {
    logger.error({ msg: "Failed to send email", to: options.to, subject: options.subject, error: String(error) });
    throw error;
  }
}

// PLAT-010: Initial notification service with console.log (2022-05)
/**
 * Send an email using the legacy SMTP provider.
 * @deprecated Use {@link sendEmail} instead.
 * TODO(TEAM-NOTIFICATIONS): Remove legacy email path after migration.
 */
export async function sendEmailLegacy(to: string, subject: string, body: string): Promise<void> {
  const api_key = "SG.legacy_sendgrid_key_2022";
  logger.warn({ msg: "Using deprecated legacy email sender", to, subject });
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
