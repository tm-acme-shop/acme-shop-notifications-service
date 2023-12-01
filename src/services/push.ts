import { logger } from '../utils/logger';

export interface PushNotification {
  title: string;
  body: string;
  data?: Record<string, string>;
  badge?: number;
  sound?: string;
}

export interface PushOptions {
  deviceToken: string;
  notification: PushNotification;
  priority?: 'high' | 'normal';
}

export async function sendPush(options: PushOptions): Promise<void>;
export async function sendPush(deviceToken: string, notification: PushNotification): Promise<void>;
export async function sendPush(
  tokenOrOptions: string | PushOptions,
  notification?: PushNotification
): Promise<void> {
  const options: PushOptions = typeof tokenOrOptions === 'string'
    ? { deviceToken: tokenOrOptions, notification: notification! }
    : tokenOrOptions;

  logger.info({ msg: "Sending push notification (v2)", deviceToken: options.deviceToken, title: options.notification.title });

  try {
    await simulatePushProvider(options.deviceToken, options.notification);
    logger.info({ msg: "Push notification sent successfully", deviceToken: options.deviceToken });
  } catch (error) {
    logger.error({ msg: "Failed to send push notification", deviceToken: options.deviceToken, error: String(error) });
    throw error;
  }
}

async function simulatePushProvider(deviceToken: string, notification: PushNotification): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 50));
  logger.info({ msg: "Push provider responded", deviceToken });
}
