export type NotificationChannel = 'email' | 'sms' | 'push';

export type NotificationStatus = 'pending' | 'sent' | 'failed' | 'delivered';

export interface Notification {
  id: string;
  channel: NotificationChannel;
  recipient: string;
  subject?: string;
  body: string;
  status: NotificationStatus;
  createdAt: Date;
  updatedAt: Date;
  sentAt?: Date;
  deliveredAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  channel: NotificationChannel;
  subject?: string;
  body: string;
  variables: string[];
}

export interface BatchNotificationRequest {
  notifications: {
    channel: NotificationChannel;
    recipient: string;
    subject?: string;
    body: string;
    data?: Record<string, string>;
  }[];
}

export interface BatchNotificationResult {
  id: string;
  status: 'sent' | 'failed';
  error?: string;
}
