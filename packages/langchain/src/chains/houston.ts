import type { AIMessage, HumanMessage } from '@langchain/core/messages';
import { QdrantVectorStore } from '@langchain/qdrant';
import { Document } from '@langchain/core/documents';
import { SelfQueryRetriever } from 'langchain/retrievers/self_query';
import { QdrantTranslator } from '@langchain/community/structured_query/qdrant';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import {
	RunnablePassthrough,
	RunnableSequence,
} from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';

import type { Schemas } from '@qdrant/js-client-rest';

import { env } from '@sensor-it/env/server';

import { openAiChat } from '../components/llms/chat-open-ai';
import { openAIEmbeddings } from '../lib/open-ai-embeddings';

type Memory = AIMessage | HumanMessage;

type Options = {
	filter?: Schemas['Filter'];
	questionType: 'support' | 'monitoring';
};

const collectionDetails = {
	support: {
		name: 'common_questions',
		documentContents: 'Common questions asked by users',
		attributeInfo: [],
	},
	monitoring: {
		name: 'metrics',
		documentContents: "Metrics captured from the organization's device",
		attributeInfo: [
			{
				name: 'type',
				description: 'The type of the metric',
				type: 'string',
			},
			{
				name: 'atlasOrganizationId',
				description: 'The organization id of the user',
				type: 'string',
			},
			{
				name: 'serialNumber',
				description: 'The serial number of the device',
				type: 'string',
			},
			{
				name: 'timestamp',
				description: 'The creation date of the metric',
				type: 'string',
			},
		],
	},
};

const formatDocs = (docs: Document[]) => {
	return docs.map((doc) => JSON.stringify(doc)).join('\n\n');
};

export async function createChainFromMemories(
	memories: Memory[],
	options: Options,
) {
	const { filter, questionType } = options;

	// const memory = new BufferMemory({
	// 	chatHistory: new ChatMessageHistory(memories),
	// 	aiPrefix: 'IA:',
	// 	humanPrefix: 'Human:',
	// 	memoryKey: 'chat_history',
	// 	inputKey: 'question',
	// 	outputKey: 'text',
	// 	returnMessages: true,
	// });

	const collection = collectionDetails[questionType];

	// const qDrantVectorStore = createQDrantVectorInstance({
	// 	collectionName: collection.name,
	// });

	// const qDrantRetriever = qDrantVectorStore.asRetriever({
	// 	k: 3,
	// 	filter,
	// });

	const docs = [
		new Document({
			pageContent: '50',
			metadata: {
				timestamp: '2024-09-20T03:53:09.666Z',
				atlasOrganizationId: 'a674aaae-6378-46e5-883d-d7b707bd4a95',
				serialNumber: '12345',
				type: 'temperature',
			},
		}),
	];

	const qDrantVectorStore = await QdrantVectorStore.fromDocuments(
		docs,
		openAIEmbeddings,
		{
			url: env.QDRANT_URL,
			apiKey: env.QDRANT_API_KEY,
			collectionName: collection.name,
		},
	);

	const qDrantRetriever = SelfQueryRetriever.fromLLM({
		llm: openAiChat,
		vectorStore: qDrantVectorStore,
		structuredQueryTranslator: new QdrantTranslator(),
		documentContents: collection.documentContents,
		attributeInfo: collection.attributeInfo,
		// searchParams: {
		// 	k: 3,
		// 	filter,
		// 	mergeFiltersOperator: 'and',
		// },
	});

	const prompt = ChatPromptTemplate.fromTemplate(`
		Responda a pergunta baseado apenas no contexto fornecido.
		
		Contexto: {context}
		
		Pergunta: {question}`);

	const ragChain = RunnableSequence.from([
		{
			context: qDrantRetriever.pipe(formatDocs),
			question: new RunnablePassthrough(),
		},
		prompt,
		openAiChat,
		new StringOutputParser(),
	]);

	// const contextualizeQuestionPrompt = `
	//   Dado a conversa e a última pergunta do usuário que pode fazer referência ao contexto no histórico de bate-papo,
	//   reformule uma pergunta independente que possa ser entendida sem o histórico de bate-papo. NÃO responda à pergunta,
	//   apenas reformule-a se necessário e, caso contrário, retorne-a como está.
	// `;

	// const contextualizeQuestionTemplate = ChatPromptTemplate.fromMessages([
	// 	['system', contextualizeQuestionPrompt],
	// 	new MessagesPlaceholder('chat_history'),
	// 	['human', '{input}'],
	// ]);

	// const historyAwareRetriever = await createHistoryAwareRetriever({
	// 	llm: openAiChat,
	// 	retriever: qDrantRetriever,
	// 	rephrasePrompt: contextualizeQuestionTemplate,
	// });

	// const questionAnswerTemplate = ChatPromptTemplate.fromMessages([
	// 	['system', getPrompt(questionType)],
	// 	new MessagesPlaceholder('chat_history'),
	// 	['human', '{input}'],
	// ]);

	// const questionAnswerChain = await createStuffDocumentsChain({
	// 	llm: openAiChat,
	// 	prompt: questionAnswerTemplate,
	// });

	// const conversationChain = await createRetrievalChain({
	// 	retriever: historyAwareRetriever,
	// 	combineDocsChain: questionAnswerChain,
	// });

	return ragChain;
}
