import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

const blogPosts = [
  {
    id: 1,
    title: 'Thekua: More Than Just a Snack, A Bihari Tradition',
    excerpt: 'Explore the rich history and cultural significance of Thekua in Bihari festivals, especially during Chhath Puja.',
    date: 'July 15, 2024',
    category: 'Culture',
    image: 'thekua-1',
  },
  {
    id: 2,
    title: 'How to Make Perfect Thekua at Home: Our Family Recipe',
    excerpt: 'A step-by-step guide to recreating the authentic taste of Thekua in your own kitchen. Learn the secrets from our family recipe.',
    date: 'July 10, 2024',
    category: 'Recipe',
    image: 'story-image',
  },
  {
    id: 3,
    title: 'Pairing Thekua: Creative Ways to Enjoy This Bihari Delight',
    excerpt: 'From a simple cup of tea to pairing it with ice cream, discover new and exciting ways to enjoy your favorite Thekua.',
    date: 'July 5, 2024',
    category: 'Food',
    image: 'thekua-8',
  },
];

export default function BlogPage() {
  return (
    <div className="container py-12 md:py-24">
      <h1 className="mb-8 text-center font-headline text-4xl font-bold md:text-5xl">
        The Thekua Chronicles
      </h1>
      <p className="mb-12 max-w-2xl mx-auto text-center text-muted-foreground">
        Stories, recipes, and cultural tidbits about your favorite Bihari snack.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => {
          const imageUrl = placeholderImages.placeholderImages.find(p => p.id === post.image)?.imageUrl || "/placeholder.svg";
          return (
            <Link href="#" key={post.id}>
              <Card className="h-full overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                 <CardHeader className="p-0">
                    <div className="aspect-video relative">
                      <Image src={imageUrl} alt={post.title} fill className="object-cover" />
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                  <CardTitle className="mb-2 text-xl leading-tight">{post.title}</CardTitle>
                  <p className="mb-4 text-sm text-muted-foreground">{post.excerpt}</p>
                  <p className="text-xs text-muted-foreground">{post.date}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
