import { Document } from 'langchain/document';
import type { QdrantVectorStore } from 'langchain/vectorstores/qdrant';

import { createQDrantVectorInstance } from '../components/stores/qdrant';

import { splitter } from '../lib/splitter';

interface Metric {
	atlasOrganizationSlug: string;
	deviceName: string;
	serialNumber: string;
	type: string;
	value: number;
}

export class MetricService {
	private collectionName = 'metrics';
	private qdrantVectorStore: QdrantVectorStore;

	constructor() {
		this.qdrantVectorStore = createQDrantVectorInstance({
			collectionName: this.collectionName,
		});
	}

	async addMetrics(metrics: Metric[]) {
		const documents = metrics.map((metric) => {
			return new Document({
				pageContent: metric.value.toString(),
				metadata: {
					timestamp: new Date(),
					atlasOrganizationSlug: metric.atlasOrganizationSlug,
					deviceName: metric.deviceName,
					serialNumber: metric.serialNumber,
					type: metric.type,
				},
			});
		});

		const splittedDocuments = await splitter.splitDocuments(documents);

		await this.qdrantVectorStore.addDocuments(splittedDocuments);
	}

	async removeMetric(serialNumber: string) {
		await this.qdrantVectorStore.client.delete(this.collectionName, {
			filter: {
				must: [
					{
						key: 'metadata.serialNumber',
						match: {
							value: serialNumber,
						},
					},
				],
			},
		});
	}

	async getMetric(serialNumber: string) {
		const response = await this.qdrantVectorStore.client.scroll(
			this.collectionName,
			{
				with_vector: false,
				with_payload: false,
				filter: {
					must: [
						{
							key: 'metadata.serialNumber',
							match: {
								value: serialNumber,
							},
						},
					],
				},
			},
		);

		return response;
	}
}
