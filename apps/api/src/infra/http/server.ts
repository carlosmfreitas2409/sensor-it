import { app } from './app';

app.listen(3333, () => {
	console.log(`🔥 HTTP server is running at ${app.server?.port}!`);
});
