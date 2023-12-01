import { Router, Request, Response } from 'express';
import { sendEmailLegacy } from '../services/email';
import { sendSmsLegacy } from '../services/sms';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';

// TODO(TEAM-NOTIFICATIONS): Deprecate v1 API and migrate clients to v2.

export const v1Router = Router();

interface SendRequest {
  type: 'email' | 'sms';
  to: string;
  subject?: string;
  body: string;
}

const notificationStore: Map<string, { status: string; type: string; createdAt: string }> = new Map();

v1Router.post('/send', async (req: Request, res: Response) => {
  const { type, to, subject, body } = req.body as SendRequest;
  const id = uuidv4();
  const createdAt = new Date().toISOString();

  logger.warn({ msg: "V1 API is deprecated, use V2 API instead", id, type, to });

  try {
    if (type === 'email') {
      await sendEmailLegacy(to, subject || 'No Subject', body);
    } else if (type === 'sms') {
      await sendSmsLegacy(to, body);
    } else {
      logger.error({ msg: "Unknown notification type", type });
      res.status(400).json({ error: 'Unknown notification type' });
      return;
    }

    notificationStore.set(id, { status: 'sent', type, createdAt });
    logger.info({ msg: "Notification sent via v1 API", id });
    res.json({ id, status: 'sent' });
  } catch (error) {
    logger.error({ msg: "Failed to send notification", id, error: String(error) });
    notificationStore.set(id, { status: 'failed', type, createdAt });
    res.status(500).json({ id, status: 'failed', error: 'Send failed' });
  }
});

v1Router.get('/status/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  logger.info({ msg: "Status check via v1 API", id });

  const notification = notificationStore.get(id);
  if (!notification) {
    res.status(404).json({ error: 'Notification not found' });
    return;
  }

  res.json({ id, ...notification });
});
