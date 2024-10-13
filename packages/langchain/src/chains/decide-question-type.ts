import { type AIMessage, HumanMessage } from 'langchain/schema';

import { decideQuestionTypePrompt } from '../components/prompts/decide-question-type';
import { z } from 'zod';
import { openAiChat } from '../components/llms/chat-open-ai';

import { zodToJsonSchema } from 'zod-to-json-schema';

type Memory = AIMessage | HumanMessage;

const questionTypeSchema = z.object({
	type: z.enum(['support', 'monitoring']).describe('The type of the question'),
});

export type QuestionType = z.infer<typeof questionTypeSchema>['type'];

export async function decideQuestionType(
	memories: Memory[],
	question: string,
): Promise<QuestionType> {
	const questionTypeSchemaJSON = zodToJsonSchema(questionTypeSchema);

	const decideQuestionTypeResult = await openAiChat.invoke(
		[...memories, new HumanMessage(question)],
		{
			functions: [
				{
					name: 'decide_question_type',
					description: decideQuestionTypePrompt,
					parameters: questionTypeSchemaJSON,
				},
			],
			function_call: { name: 'decide_question_type' },
		},
	);

	const questionTypeResultToJSON = decideQuestionTypeResult.toJSON();

	if (!('kwargs' in questionTypeResultToJSON)) {
		throw new Error('Houston could not process the request');
	}

	const { type: questionType = 'monitoring' } = JSON.parse(
		questionTypeResultToJSON.kwargs?.additional_kwargs?.function_call
			?.arguments,
	);

	// const decideQuestionTool = new DynamicStructuredTool({
	// 	name: 'extract_question_type',
	// 	description: decideQuestionTypePrompt,
	// 	schema: questionTypeSchema,
	// 	func: async ({ type }) => type,
	// });

	// const result = await decideQuestionTool.invoke([
	// 	...memories,
	// 	new HumanMessage(question),
	// ]);

	return questionType as QuestionType;
}
