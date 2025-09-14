import { TopicGenerator } from './components/topic-generator';

export default function BlogIdeasPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-4 font-headline text-4xl font-bold md:text-5xl">
          Unleash Your Creativity
        </h1>
        <p className="mb-8 max-w-2xl mx-auto text-muted-foreground">
          Struggling with what to write about? Use our AI-powered tool to generate engaging blog post ideas related to Thekua and Bihari culture.
        </p>
      </div>
      <TopicGenerator />
    </div>
  );
}
