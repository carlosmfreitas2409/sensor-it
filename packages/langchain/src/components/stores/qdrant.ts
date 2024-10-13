import { QdrantVectorStore } from 'langchain/vectorstores/qdrant';

import { env } from '@sensor-it/env/server';

import { openAIEmbeddings } from '../../lib/open-ai-embeddings';

// import { QdrantVectorStore } from './qdrant-vector-store';

interface CreateQDrantVectorInstanceOptions {
	collectionName?: string;
}

export function createQDrantVectorInstance({
	collectionName = 'metrics',
}: CreateQDrantVectorInstanceOptions) {
	return new QdrantVectorStore(openAIEmbeddings, {
		url: env.QDRANT_URL,
		collectionName,
		collectionConfig: {
			vectors: {
				size: 1536,
				distance: 'Cosine',
			},
		},
	});
}
