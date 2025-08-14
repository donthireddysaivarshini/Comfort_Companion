'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized self-care suggestions based on user emotions.
 *
 * The flow takes a user's emotional state as input and returns a list of tailored self-care suggestions.
 *
 * @exports personalizedSelfCare - The main function to trigger the flow.
 * @exports PersonalizedSelfCareInput - The input type for the personalizedSelfCare function.
 * @exports PersonalizedSelfCareOutput - The output type for the personalizedSelfCare function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SelfCareSuggestionSchema = z.string().describe('A specific self-care suggestion.');

const PersonalizedSelfCareInputSchema = z.object({
  emotion: z
    .string()
    .describe("The user's current emotional state (e.g., stressed, overwhelmed, lonely)."),
});
export type PersonalizedSelfCareInput = z.infer<typeof PersonalizedSelfCareInputSchema>;

const PersonalizedSelfCareOutputSchema = z.object({
  suggestions: z
    .array(SelfCareSuggestionSchema)
    .describe('A list of self-care suggestions tailored to the user emotion.'),
});
export type PersonalizedSelfCareOutput = z.infer<typeof PersonalizedSelfCareOutputSchema>;

export async function personalizedSelfCare(input: PersonalizedSelfCareInput): Promise<PersonalizedSelfCareOutput> {
  return personalizedSelfCareFlow(input);
}

const selfCareSuggestionsTool = ai.defineTool(
  {
    name: 'getSelfCareSuggestions',
    description: 'Retrieves a list of self-care suggestions based on the user emotion.',
    inputSchema: z.object({
      emotion: z
        .string()
        .describe("The user's current emotional state (e.g., stressed, overwhelmed, lonely)."),
    }),
    outputSchema: z.array(z.string()),
  },
  async input => {
    const suggestions: Record<string, string[]> = {
      stressed: [
        'Take 5 slow, deep breaths.',
        'Splash cool water on your face.',
        'Step outside for fresh air.',
        'Put on your favorite song.',
        'Make yourself a warm drink.',
        'Do some gentle stretches.',
      ],
      overwhelmed: [
        'Write down 3 things you accomplished today.',
        'Choose just ONE priority for tomorrow.',
        'Take a 10-minute break.',
        'Ask yourself: what would I tell a friend?',
        'Remember: progress over perfection.',
      ],
      sadness: [
        'Let yourself cry - tears heal.',
        'Wrap yourself in a soft blanket.',
        'Watch something that makes you smile.',
        'Call someone who loves you.',
        'Write down one thing you are grateful for.',
        'Be patient with yourself.',
      ],
      anxiety: [
        'Ground yourself: name 5 things you can see.',
        'Remind yourself: this feeling will pass.',
        'Focus on what you can control today.',
        'Try the 4-7-8 breathing technique.',
        'Move your body gently.',
        'You are safe right now.',
      ],
      loneliness: [
        'Sit by a window and people-watch.',
        'Send a kind message to someone.',
        'Do something creative with your hands.',
        'Visit a place where people gather (coffee shop, park).',
        'Remember: you matter to more people than you know.',
      ],
    };

    const emotion = input.emotion.toLowerCase();
    return suggestions[emotion] || ['No specific suggestions found for this emotion.'];
  }
);

const prompt = ai.definePrompt({
  name: 'personalizedSelfCarePrompt',
  tools: [selfCareSuggestionsTool],
  input: {schema: PersonalizedSelfCareInputSchema},
  output: {schema: PersonalizedSelfCareOutputSchema},
  prompt: `Based on the user's emotion, suggest some self-care activities.

Emotion: {{{emotion}}}

Use the getSelfCareSuggestions tool to retrieve a list of suggestions.`,
});

const personalizedSelfCareFlow = ai.defineFlow(
  {
    name: 'personalizedSelfCareFlow',
    inputSchema: PersonalizedSelfCareInputSchema,
    outputSchema: PersonalizedSelfCareOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
