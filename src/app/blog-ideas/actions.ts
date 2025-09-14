"use server";

import { generateBlogTopics } from '@/ai/flows/generate-blog-topics';
import { z } from 'zod';

const formSchema = z.object({
  theme: z.string().min(3, 'Theme must be at least 3 characters long.'),
  numTopics: z.coerce.number().min(1, 'Number of topics must be at least 1.').max(10, 'Cannot generate more than 10 topics.'),
});

export type FormState = {
  message: string;
  topics?: string[];
  fields?: Record<string, string | undefined>;
  issues?: string[];
};

export async function generateTopicsAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      message: "Please fix the errors below.",
      fields: {
        theme: fieldErrors.theme?.[0],
        numTopics: fieldErrors.numTopics?.[0],
      },
      issues: validatedFields.error.issues.map((issue) => issue.message),
    };
  }

  try {
    const result = await generateBlogTopics(validatedFields.data);
    if (result.topics && result.topics.length > 0) {
      return { message: 'Successfully generated topics!', topics: result.topics };
    }
    return { message: 'The AI could not generate topics for this theme. Try a different one.' };
  } catch (error) {
    console.error(error);
    return { message: 'An unexpected error occurred on the server. Please try again later.' };
  }
}
