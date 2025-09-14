"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { Lightbulb, Loader2 } from 'lucide-react';
import { generateTopicsAction, type FormState } from '@/app/blog-ideas/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        'Generate Topics'
      )}
    </Button>
  );
}

export function TopicGenerator() {
  const initialState: FormState = {
    message: '',
  };
  const [state, formAction] = useFormState(generateTopicsAction, initialState);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>AI Blog Idea Generator</CardTitle>
            <CardDescription>
              Get compelling blog post ideas about Thekua traditions, recipes, and culture.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Input
                id="theme"
                name="theme"
                placeholder="e.g., Thekua in Bihari weddings"
                defaultValue="Thekua traditions and uses"
                required
              />
              {state.fields?.theme && (
                <p className="text-sm text-destructive">{state.fields.theme}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="numTopics">Number of Topics</Label>
              <Input
                id="numTopics"
                name="numTopics"
                type="number"
                defaultValue="5"
                min="1"
                max="10"
                required
              />
              {state.fields?.numTopics && (
                <p className="text-sm text-destructive">{state.fields.numTopics}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {state.message && state.topics && state.topics.length > 0 && (
         <Alert className="mt-6 border-primary text-primary">
          <Lightbulb className="h-4 w-4 !text-primary" />
          <AlertTitle>Generated Topics!</AlertTitle>
          <AlertDescription>
             <ul className="mt-2 list-disc space-y-2 pl-5">
              {state.topics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {state.message && (!state.topics || state.topics.length === 0) && (
         <Alert variant={state.issues || state.fields ? "destructive": "default"} className="mt-6">
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>{state.issues || state.fields ? "Error" : "Status"}</AlertTitle>
          <AlertDescription>
            {state.message}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
