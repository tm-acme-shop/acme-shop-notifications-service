# Acme Shop Notifications Service

A Node.js notification service for sending emails, SMS, and push notifications.

## Features

- Multi-channel notifications (Email, SMS, Push)
- V2 API (recommended) with structured responses
- Structured logging with Winston
- Batch notification support

## Getting Started

```bash
npm install
npm run dev
```

## API Endpoints

### V2 API (Recommended)

- `POST /api/v2/notifications` - Send a notification
- `GET /api/v2/notifications/:id` - Get notification status
- `POST /api/v2/notifications/batch` - Send batch notifications

### V1 API (Deprecated)

> **Note:** V1 API is deprecated. Please migrate to V2.

- `POST /api/v1/send` - Legacy send endpoint
- `GET /api/v1/status/:id` - Legacy status endpoint

## Architecture

```
src/
├── api/          # HTTP routes and handlers
├── services/     # Business logic
└── utils/        # Shared utilities (logger, etc.)
```

## License

MIT
