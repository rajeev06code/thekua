'use server';

/**
 * @fileOverview AI-powered blog topic generator for Thekua traditions and uses.
 *
 * - generateBlogTopics - A function that generates blog post topics.
 * - GenerateBlogTopicsInput - The input type for the generateBlogTopics function.
 * - GenerateBlogTopicsOutput - The return type for the generateBlogTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogTopicsInputSchema = z.object({
  theme: z
    .string()
    .default('Thekua traditions and uses')
    .describe('The theme for generating blog post topics.'),
  numTopics: z
    .number()
    .default(5)
    .describe('The number of blog post topics to generate.'),
});
export type GenerateBlogTopicsInput = z.infer<typeof GenerateBlogTopicsInputSchema>;

const GenerateBlogTopicsOutputSchema = z.object({
  topics: z
    .array(z.string())
    .describe('An array of generated blog post topics.'),
});
export type GenerateBlogTopicsOutput = z.infer<typeof GenerateBlogTopicsOutputSchema>;

export async function generateBlogTopics(input: GenerateBlogTopicsInput): Promise<GenerateBlogTopicsOutput> {
  return generateBlogTopicsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogTopicsPrompt',
  input: {schema: GenerateBlogTopicsInputSchema},
  output: {schema: GenerateBlogTopicsOutputSchema},
  prompt: `You are a blog content creator specializing in generating engaging content related to Bihari cuisine, especially Thekua.

  Generate {{numTopics}} blog post topics related to the theme: {{{theme}}}.  The topics should be interesting to people interested in Thekua, Bihari culture, or Indian snacks.

  Return the topics as a JSON array of strings.`,
});

const generateBlogTopicsFlow = ai.defineFlow(
  {
    name: 'generateBlogTopicsFlow',
    inputSchema: GenerateBlogTopicsInputSchema,
    outputSchema: GenerateBlogTopicsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
