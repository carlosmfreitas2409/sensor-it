import { ChatOpenAI } from 'langchain/chat_models/openai';

import { env } from '@sensor-it/env/server';

// export const openAiChat = new ChatOpenAI({
// 	azureOpenAIApiKey: env.AZURE_OPENAI_API_KEY,
// 	azureOpenAIApiInstanceName: env.AZURE_OPENAI_INSTANCE_NAME,
// 	azureOpenAIApiDeploymentName: env.AZURE_OPENAI_DEPLOYMENT_NAME,
// 	azureOpenAIApiVersion: env.AZURE_OPENAI_API_VERSION,
// 	temperature: 0.3,
// 	modelName: 'gpt-3.5-turbo',
// 	streaming: true,
// 	maxTokens: -1,
// });

export const openAiChat = new ChatOpenAI({
	openAIApiKey: env.OPENAI_API_KEY,
	temperature: 0.3,
	modelName: 'gpt-4o',
	streaming: true,
	maxTokens: -1,
});
