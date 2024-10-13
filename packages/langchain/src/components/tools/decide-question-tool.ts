import { z } from 'zod';

import { decideQuestionTypePrompt } from '../prompts/decide-question-type';
import { DynamicStructuredTool } from 'langchain/tools';

const questionTypeSchema = z.object({
	type: z.enum(['support', 'monitoring']).describe('The type of the question'),
});

// export const decideQuestionTool = Tool(({ type }) => type, {
// 	name: 'extract_question_type',
// 	description: decideQuestionTypePrompt,
// 	schema: questionTypeSchema,
// });

export const decideQuestionTool = new DynamicStructuredTool({
	name: 'extract_question_type',
	description: decideQuestionTypePrompt,
	schema: questionTypeSchema,
	func: async ({ type }) => type,
});
