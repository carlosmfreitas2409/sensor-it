import { ConversationalRetrievalQAChain, LLMChain } from 'langchain/chains';
import { BufferMemory, ChatMessageHistory } from 'langchain/memory';
import { PromptTemplate } from 'langchain/prompts';
import type { AIMessage, HumanMessage } from 'langchain/schema';

import type { Schemas } from '@qdrant/js-client-rest';

import { openAiChat } from '../components/llms/chat-open-ai';
import { openAiGenerator } from '../components/llms/generator-open-ai';
import { createQDrantVectorInstance } from '../components/stores/qdrant';
import { getPrompt } from '../components/prompts';

import { CombineDocsWithMetadataChain } from './combine-docs-with-metadata';

import type { QuestionType } from './decide-question-type';

type Memory = AIMessage | HumanMessage;

type Options = {
	filter?: Schemas['Filter'];
	questionType: QuestionType;
};

const collectionName = {
	support: 'common_questions',
	monitoring: 'metrics',
};

export async function createChainFromMemories(
	memories: Memory[],
	options: Options,
) {
	const { filter, questionType } = options;

	const memory = new BufferMemory({
		chatHistory: new ChatMessageHistory(memories),
		aiPrefix: 'IA:',
		humanPrefix: 'Humano:',
		memoryKey: 'chat_history',
		inputKey: 'question',
		outputKey: 'text',
		returnMessages: true,
	});

	const qDrantVectorStore = createQDrantVectorInstance({
		collectionName: collectionName[questionType],
	});

	const qDrantRetriever = qDrantVectorStore.asRetriever({
		k: 3,
		filter,
	});

	const questionGeneratorChain = new LLMChain({
		llm: openAiGenerator,
		prompt: PromptTemplate.fromTemplate(`
			Dado a conversa e a última pergunta do usuário que pode fazer referência ao contexto no histórico de bate-papo,
			reformule uma pergunta independente que possa ser entendida sem o histórico de bate-papo. NÃO responda à pergunta,
			apenas reformule-a se necessário e, caso contrário, retorne-a como está.

			Histórico do bate-papo:
			{chat_history}

			Pergunta:
			{question}
		`),
	});

	const combineDocumentsChain = new CombineDocsWithMetadataChain({
		llmChain: new LLMChain({
			llm: openAiChat,
			prompt: getPrompt(questionType),
		}),
		template:
			'Dispositivo: "{{deviceName}}" (Dado capturado: "{{type}}" - Valor: "{{pageContent}}" - Data de captura: "{{timestamp}}")',
	});

	const questionTypesAllowedToReturnSources = ['monitoring'];

	const shouldReturnSources =
		questionTypesAllowedToReturnSources.includes(questionType);

	const houston = new ConversationalRetrievalQAChain({
		inputKey: 'question',
		returnSourceDocuments: shouldReturnSources,
		memory,
		retriever: qDrantRetriever,
		questionGeneratorChain,
		combineDocumentsChain,
	});

	return houston;
}
