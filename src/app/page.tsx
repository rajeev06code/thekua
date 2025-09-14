import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { products, testimonials } from '@/lib/data';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/product-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import placeholderImages from '@/lib/placeholder-images.json';

const featuredProducts = products.slice(0, 4);

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] w-full text-white md:h-[80vh]">
        <Image
          src={placeholderImages.placeholderImages.find(p => p.id === "hero-banner")?.imageUrl || "/placeholder.svg"}
          alt="Traditional Thekua snacks"
          fill
          className="object-cover"
          priority
          data-ai-hint="thekua snacks"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Taste of Tradition, Bite of Bihar.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-200 md:text-xl">
            Discover the authentic flavor of Bihari Thekua, handcrafted with love and heritage.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/products">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="featured-products" className="py-12 md:py-24">
        <div className="container">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold md:mb-12 md:text-4xl">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="story" className="bg-secondary/50 py-12 md:py-24">
        <div className="container grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={placeholderImages.placeholderImages.find(p => p.id === "story-image")?.imageUrl || "/placeholder.svg"}
              alt="The making of Thekua"
              fill
              className="object-cover"
              data-ai-hint="making sweets"
            />
          </div>
          <div>
            <h2 className="mb-4 font-headline text-3xl font-bold md:text-4xl">
              Our Story
            </h2>
            <p className="mb-4 text-muted-foreground">
              Thekua Delight was born from a desire to share a piece of our Bihari heritage with the world. Our journey began in a family kitchen, with a recipe passed down through generations. We believe in authenticity, using only the finest natural ingredients to create Thekua that tastes just like home.
            </p>
            <p className="text-muted-foreground">
              Each Thekua is more than just a snack; it's a celebration of culture, family, and the timeless traditions of Bihar.
            </p>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-12 md:py-24">
        <div className="container">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold md:mb-12 md:text-4xl">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Avatar>
                       <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="my-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < testimonial.rating ? 'text-accent' : 'text-muted-foreground/50'}`} fill={i < testimonial.rating ? 'currentColor' : 'none'}/>
                    ))}
                  </div>
                  <p className="text-muted-foreground">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
