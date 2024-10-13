import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

import { sendMessage } from './routes/send-message';
import { getChatById } from './routes/get-chat-by-id';
import { searchRecentChats } from './routes/search-recent-chats';

const app = new Elysia()
	.use(
		cors({
			credentials: true,
			allowedHeaders: ['content-type', 'authorization'],
			methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
			origin: (request): boolean => {
				const origin = request.headers.get('origin');

				if (!origin) {
					return false;
				}

				return true;
			},
		}),
	)
	.use(sendMessage)
	.use(getChatById)
	.use(searchRecentChats);

export { app };
