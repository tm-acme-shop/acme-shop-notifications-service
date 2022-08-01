import { Router, Request, Response } from 'express';
import { sendEmail } from '../services/email';
import { sendSms } from '../services/sms';
import { sendPush, PushNotification } from '../services/push';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';

export const v2Router = Router();

interface NotificationRequest {
  channel: 'email' | 'sms' | 'push';
  recipient: string;
  subject?: string;
  body: string;
  data?: Record<string, string>;
}

const notificationStore: Map<string, { status: string; channel: string; createdAt: string }> = new Map();

v2Router.post('/notifications', async (req: Request, res: Response) => {
  const { channel, recipient, subject, body, data } = req.body as NotificationRequest;
  const id = uuidv4();
  const createdAt = new Date().toISOString();

  logger.info({ msg: "Processing v2 notification request", id, channel, recipient });

  try {
    switch (channel) {
      case 'email':
        await sendEmail(recipient, subject || 'Notification', body);
        break;
      case 'sms':
        await sendSms(recipient, body);
        break;
      case 'push':
        const notification: PushNotification = { title: subject || 'Notification', body, data };
        await sendPush(recipient, notification);
        break;
      default:
        logger.warn({ msg: "Unknown notification channel", channel });
        res.status(400).json({ error: 'Unknown notification channel' });
        return;
    }

    notificationStore.set(id, { status: 'sent', channel, createdAt });
    logger.info({ msg: "Notification sent successfully", id, channel });
    res.status(201).json({ id, status: 'sent', createdAt });
  } catch (error) {
    logger.error({ msg: "Failed to send notification", id, channel, error: String(error) });
    notificationStore.set(id, { status: 'failed', channel, createdAt });
    res.status(500).json({ id, status: 'failed', error: 'Send failed' });
  }
});

v2Router.get('/notifications/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  logger.info({ msg: "Fetching notification status", id });

  const notification = notificationStore.get(id);
  if (!notification) {
    res.status(404).json({ error: 'Notification not found' });
    return;
  }

  res.json({ id, ...notification });
});

v2Router.post('/notifications/batch', async (req: Request, res: Response) => {
  const { notifications } = req.body as { notifications: NotificationRequest[] };
  logger.info({ msg: "Processing batch notification request", count: notifications.length });

  const results = await Promise.allSettled(
    notifications.map(async (notif) => {
      const id = uuidv4();
      try {
        switch (notif.channel) {
          case 'email':
            await sendEmail(notif.recipient, notif.subject || 'Notification', notif.body);
            break;
          case 'sms':
            await sendSms(notif.recipient, notif.body);
            break;
          case 'push':
            await sendPush(notif.recipient, { title: notif.subject || 'Notification', body: notif.body, data: notif.data });
            break;
        }
        return { id, status: 'sent' };
      } catch (error) {
        return { id, status: 'failed', error: String(error) };
      }
    })
  );

  logger.info({ msg: "Batch notification completed", count: notifications.length });
  res.status(201).json({ results: results.map(r => r.status === 'fulfilled' ? r.value : r.reason) });
});
