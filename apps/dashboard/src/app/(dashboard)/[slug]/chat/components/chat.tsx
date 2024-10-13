import { getUserViaToken } from '@/lib/auth';

import { ChatPanel } from './chat-panel';
import { ChatList } from './chat-list';

export async function Chat() {
	const { user } = await getUserViaToken();

	return (
		<div className="flex h-full w-full flex-col">
			<div className="flex flex-1 overflow-hidden">
				<ChatList />
			</div>

			<ChatPanel currentUser={user} />
		</div>
	);
}
