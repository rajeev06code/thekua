import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import { CategoryBrowser } from '@/components/category-browser';
import { HeroCarousel } from '@/components/hero-carousel';
import { ProductCarousel } from '@/components/product-carousel';

export default function Home() {
  const categories = [
    ...new Set(products.map(p => p.category.charAt(0).toUpperCase() + p.category.slice(1)))
  ].map(categoryName => {
    const product = products.find(p => p.category.toLowerCase() === categoryName.toLowerCase());
    return {
      name: categoryName,
      image: product?.images[0].id || 'thekua-1'
    };
  });
  
  const heroImages = [
    placeholderImages.placeholderImages.find(p => p.id === "hero-banner"),
    placeholderImages.placeholderImages.find(p => p.id === "new-hero-1"),
    placeholderImages.placeholderImages.find(p => p.id === "new-hero-2"),
    placeholderImages.placeholderImages.find(p => p.id === "thekua-8"),
  ].filter(Boolean) as { id: string; description: string; imageUrl: string; imageHint: string; }[];

  const popularProducts = products.filter(p => p.tags.includes('bestseller'));
  const pujaSpecialProducts = products.filter(p => p.category === 'puja');
  const specialOfferProducts = products.filter(p => p.tags.includes('special-offer'));

  const Section = ({ title, children, href }: { title: string, href:string, children: React.ReactNode }) => (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="mb-8 flex items-center justify-between md:mb-12">
            <h2 className="text-center font-headline text-3xl font-bold md:text-4xl">
            {title}
            </h2>
            <Button asChild variant="outline">
                <Link href={href}>
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
        {children}
      </div>
    </section>
  );

  return (
    <div className="flex flex-col">
       <section className="relative h-[60vh] w-full text-white md:h-[60vh]">
        <HeroCarousel images={heroImages} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
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

      <section id="categories" className="py-8 md:py-12 bg-secondary/30">
        <div className="container">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold md:text-4xl">
            Browse by Category
          </h2>
          <CategoryBrowser categories={categories} products={products} />
        </div>
      </section>
      
      <Section title="Popular Products" href="/products">
        <ProductCarousel products={popularProducts} />
      </Section>
      
      <Section title="Puja Specials" href="/products?category=puja">
        <ProductCarousel products={pujaSpecialProducts} />
      </Section>

      <Section title="Special Offers" href="/products?tag=special-offer">
        <ProductCarousel products={specialOfferProducts} />
      </Section>

      <section id="story" className="bg-secondary/50 py-12 md:py-24">
        <div className="container grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
             <img
              src="https://picsum.photos/seed/story/600/400"
              alt="The making of Thekua"
              className="object-cover w-full h-full"
              data-ai-hint="making sweets"
            />
          </div>
          <div className="flex flex-col items-start">
            <h2 className="mb-4 font-headline text-3xl font-bold md:text-4xl">
              Our Story
            </h2>
            <p className="mb-4 text-muted-foreground">
              Thekua Delight was born from a desire to share a piece of our Bihari heritage with the world. Our journey began in a family kitchen, with a recipe passed down through generations. We believe in authenticity, using only the finest natural ingredients to create Thekua that tastes just like home.
            </p>
             <Button asChild>
                <Link href="/about">
                    Read Our Full Story
                </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-12 md:py-24">
        <div className="container">
           <h2 className="mb-8 text-center font-headline text-3xl font-bold md:mb-12 md:text-4xl">
            What Our Customers Say
          </h2>
          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg bg-secondary/30 p-8">
                <blockquote className="text-center text-xl font-medium text-foreground">
                    <p>"The Classic Ghee Thekua tastes exactly like the ones my grandmother used to make. It brought back so many childhood memories. Absolutely delicious!"</p>
                    <footer className="mt-4">
                        <cite className="text-base font-bold not-italic text-primary">Priya Sharma, Mumbai</cite>
                    </footer>
                </blockquote>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
