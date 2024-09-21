import { Elysia } from 'elysia';

import { sendMessage } from './routes/send-message';

const app = new Elysia().use(sendMessage);

export { app };
