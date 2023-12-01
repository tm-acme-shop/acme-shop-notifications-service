# Acme Shop Notifications Service

A Node.js/Express-based notification service for sending emails, SMS, and push notifications.

## Features

- Multi-channel notifications (Email, SMS, Push)
- Queue-based async processing with BullMQ
- Template-based email rendering
- Structured logging with Winston
- Request tracing via X-Acme-Request-ID header

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Redis (for queue processing)
- SMTP server (for email)
- Twilio account (for SMS)
- Firebase project (for push notifications)

### Installation

```bash
npm install
```

### Configuration

Set the following environment variables:

```bash
PORT=3002
NODE_ENV=development
REDIS_URL=redis://localhost:6379
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user
SMTP_PASS=password
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
FIREBASE_PROJECT_ID=your_project
```

### Running

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

### Testing

```bash
npm test
npm run test:coverage
```

## API Endpoints

### V2 API (Current)

- `POST /api/v2/notifications` - Send a notification
- `GET /api/v2/notifications/:id` - Get notification status
- `POST /api/v2/notifications/batch` - Send batch notifications

### V1 API (Deprecated)

- `POST /api/v1/send` - Legacy send endpoint
- `GET /api/v1/status/:id` - Legacy status endpoint

## Architecture

```
src/
├── api/          # HTTP routes and handlers
├── services/     # Business logic
├── queue/        # Async job processing
├── models/       # Types and templates
└── utils/        # Shared utilities
```

## License

MIT
