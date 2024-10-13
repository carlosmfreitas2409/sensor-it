export type ChatMessage = {
	id: string;
	role: 'user' | 'assistant';
	text: string;
	createdAt: Date;
};

export type Chat = {
	id: string;
	title: string;
	authorId: string;
	createdAt: string;
	messages: ChatMessage[];
};
