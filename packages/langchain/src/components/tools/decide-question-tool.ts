import { tool } from '@langchain/core/tools';
import { z } from 'zod';

import { decideQuestionTypePrompt } from '../prompts/decide-question-type';

const questionTypeSchema = z.object({
	type: z.enum(['support', 'monitoring']).describe('The type of the question'),
});

export const decideQuestionTool = tool(({ type }) => type, {
	name: 'extract_question_type',
	description: decideQuestionTypePrompt,
	schema: questionTypeSchema,
});
