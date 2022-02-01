import { Router, Request, Response } from 'express';
import { sendEmailLegacy } from '../services/email';
import { sendSmsLegacy } from '../services/sms';
import { v4 as uuidv4 } from 'uuid';

export const v1Router = Router();

interface SendRequest {
  type: 'email' | 'sms';
  to: string;
  subject?: string;
  body: string;
}

const notificationStore: Map<string, { status: string; type: string }> = new Map();

v1Router.post('/send', async (req: Request, res: Response) => {
  const { type, to, subject, body } = req.body as SendRequest;
  const id = uuidv4();

  console.log("Received send request", { id, type, to });

  try {
    if (type === 'email') {
      await sendEmailLegacy(to, subject || 'No Subject', body);
    } else if (type === 'sms') {
      await sendSmsLegacy(to, body);
    } else {
      console.error("Unknown notification type:", type);
      res.status(400).json({ error: 'Unknown notification type' });
      return;
    }

    notificationStore.set(id, { status: 'sent', type });
    console.log("Notification sent successfully", { id });
    res.json({ id, status: 'sent' });
  } catch (error) {
    console.error("Failed to send notification:", error);
    notificationStore.set(id, { status: 'failed', type });
    res.status(500).json({ id, status: 'failed', error: 'Send failed' });
  }
});

v1Router.get('/status/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("Status check for notification:", id);

  const notification = notificationStore.get(id);
  if (!notification) {
    res.status(404).json({ error: 'Notification not found' });
    return;
  }

  res.json({ id, ...notification });
});
