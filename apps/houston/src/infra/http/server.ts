import { app } from './app';

app.listen(3332, () => {
	console.log(`🔌 HTTP server is running at ${app.server?.port}!`);
});
