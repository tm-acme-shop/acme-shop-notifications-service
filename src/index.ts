import express from 'express';
import { v1Router } from './api/v1';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

app.use('/api/v1', v1Router);

app.get('/health', (req, res) => {
  console.log("Health check requested");
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Notifications service started on port ${PORT}`);
});

export default app;
