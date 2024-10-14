import { ChatOpenAI } from 'langchain/chat_models/openai';

import { env } from '@sensor-it/env/server';

// export const openAiGenerator = new ChatOpenAI({
// 	azureOpenAIApiKey: env.AZURE_OPENAI_API_KEY,
// 	azureOpenAIApiInstanceName: env.AZURE_OPENAI_INSTANCE_NAME,
// 	azureOpenAIApiDeploymentName: env.AZURE_OPENAI_DEPLOYMENT_NAME,
// 	azureOpenAIApiVersion: env.AZURE_OPENAI_API_VERSION,
// 	modelName: 'gpt-3.5-turbo',
// 	temperature: 0,
// });

export const openAiGenerator = new ChatOpenAI({
	openAIApiKey: env.OPENAI_API_KEY,
	modelName: 'gpt-4o',
	temperature: 0,
});
