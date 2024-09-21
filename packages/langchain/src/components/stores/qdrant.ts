import { QdrantVectorStore } from '@langchain/qdrant';

import { env } from '@sensor-it/env/server';

import { openAIEmbeddings } from '../../lib/open-ai-embeddings';

interface CreateQDrantVectorInstanceOptions {
	collectionName?: string;
}

export function createQDrantVectorInstance({
	collectionName = 'metrics',
}: CreateQDrantVectorInstanceOptions) {
	return new QdrantVectorStore(openAIEmbeddings, {
		url: env.QDRANT_URL,
		apiKey: env.QDRANT_API_KEY,
		collectionName,
		collectionConfig: {
			vectors: {
				size: 1536,
				distance: 'Cosine',
			},
		},
	});
}
