import { AzureOpenAIEmbeddings } from '@langchain/openai';

import { env } from '@sensor-it/env/server';

export const openAIEmbeddings = new AzureOpenAIEmbeddings({
	azureOpenAIApiKey: env.AZURE_OPENAI_API_KEY,
	azureOpenAIApiInstanceName: env.AZURE_OPENAI_INSTANCE_NAME,
	azureOpenAIApiEmbeddingsDeploymentName:
		env.AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT_NAME,
	azureOpenAIApiVersion: env.AZURE_OPENAI_API_VERSION,
});

// export const openAIEmbeddings = new OpenAIEmbeddings({
// 	openAIApiKey: env.OPENAI_API_KEY,
// });
