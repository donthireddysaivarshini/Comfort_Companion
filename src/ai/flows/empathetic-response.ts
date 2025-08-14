'use server';
/**
 * @fileOverview An AI agent that provides empathetic and validating responses.
 *
 * - empatheticResponse - A function that generates empathetic responses to user input.
 * - EmpatheticResponseInput - The input type for the empatheticResponse function.
 * - EmpatheticResponseOutput - The return type for the empatheticResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { Message } from '@/types';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const EmpatheticResponseInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history.'),
  userName: z.string().optional().describe("The user's name, if provided."),
});
export type EmpatheticResponseInput = z.infer<typeof EmpatheticResponseInputSchema>;

const EmpatheticResponseOutputSchema = z.object({
  response: z.string().describe('The empathetic response from Comfort Companion.'),
});
export type EmpatheticResponseOutput = z.infer<typeof EmpatheticResponseOutputSchema>;

export async function empatheticResponse(input: EmpatheticResponseInput): Promise<EmpatheticResponseOutput> {
  return empatheticResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'empatheticResponsePrompt',
  input: {schema: EmpatheticResponseInputSchema},
  output: {schema: EmpatheticResponseOutputSchema},
  prompt: `You are Comfort Companion, a caring AI companion. Respond to the user input with empathy and validation, using a warm, motherly tone.
  
  Refer to the conversation history to maintain context and provide relevant, specific advice.

  {{#if userName}}
  Address the user as {{{userName}}}. You can vary your phrasing, for example: "Oh, {{{userName}}}," or "My dear {{{userName}}}," or simply start your response with their name.
  {{else}}
  Use general endearments like "Oh sweetheart," "My dear," and "Honey."
  {{/if}}

  Acknowledge their struggle before offering gentle suggestions or affirmations.  Offer soft closings: "Take care of yourself" "You deserve kindness"
  
  Conversation History:
  {{#each history}}
  {{this.role}}: {{{this.content}}}
  {{/each}}
  `,
});

const empatheticResponseFlow = ai.defineFlow(
  {
    name: 'empatheticResponseFlow',
    inputSchema: EmpatheticResponseInputSchema,
    outputSchema: EmpatheticResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
