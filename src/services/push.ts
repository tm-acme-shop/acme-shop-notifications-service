import { logger } from '../utils/logger';

export interface PushNotification {
  title: string;
  body: string;
  data?: Record<string, string>;
}

export async function sendPush(deviceToken: string, notification: PushNotification): Promise<void> {
  logger.info({ msg: "Sending push notification (v2)", deviceToken, title: notification.title });

  try {
    await simulatePushProvider(deviceToken, notification);
    logger.info({ msg: "Push notification sent successfully", deviceToken });
  } catch (error) {
    logger.error({ msg: "Failed to send push notification", deviceToken, error: String(error) });
    throw error;
  }
}

async function simulatePushProvider(deviceToken: string, notification: PushNotification): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 50));
  logger.info({ msg: "Push provider responded", deviceToken });
}
