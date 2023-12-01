import express from 'express';
import { v1Router } from './api/v1';
import { v2Router } from './api/v2';
import { logger } from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

// Request ID middleware
app.use((req, res, next) => {
  const requestId = req.headers['x-acme-request-id'] as string || `req-${Date.now()}`;
  res.setHeader('X-Acme-Request-ID', requestId);
  next();
});

// TODO(TEAM-NOTIFICATIONS): Remove v1 router after full migration to v2.
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

app.get('/health', (req, res) => {
  logger.info({ msg: "Health check", status: 'ok' });
  res.json({ status: 'ok', version: '1.0.0' });
});

app.get('/ready', (req, res) => {
  // TODO(TEAM-NOTIFICATIONS): Add actual readiness checks (Redis, SMTP, etc.)
  logger.info({ msg: "Readiness check", status: 'ok' });
  res.json({ status: 'ready' });
});

app.listen(PORT, () => {
  logger.info({ msg: "Notifications service started", port: PORT, env: process.env.NODE_ENV || 'development' });
});

export default app;
