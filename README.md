# Acme Shop Notifications Service

A Node.js notification service for sending emails, SMS, and push notifications.

## Features

- Multi-channel notifications (Email, SMS, Push)
- V1 and V2 API endpoints
- Structured logging

## Getting Started

```bash
npm install
npm run dev
```

## API Endpoints

### V2 API (New)

- `POST /api/v2/notifications` - Send a notification
- `GET /api/v2/notifications/:id` - Get notification status
- `POST /api/v2/notifications/batch` - Send batch notifications

### V1 API (Legacy)

- `POST /api/v1/send` - Send a notification
- `GET /api/v1/status/:id` - Get notification status

## License

MIT
