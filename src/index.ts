import express from 'express';
import { v1Router } from './api/v1';
import { v2Router } from './api/v2';
import { logger } from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

// TODO(TEAM-NOTIFICATIONS): Remove v1 router after full migration to v2.
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

app.get('/health', (req, res) => {
  logger.info({ msg: "Health check", status: 'ok' });
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  logger.info({ msg: "Server started", port: PORT });
});

export default app;
