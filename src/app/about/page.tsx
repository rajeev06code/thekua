import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center font-headline text-4xl font-bold md:text-5xl">
          Our Story: The Heart of Thekua Delight
        </h1>
        <div className="relative mb-8 h-96 w-full overflow-hidden rounded-lg shadow-xl">
          <Image
            src={placeholderImages.placeholderImages.find(p => p.id === "story-image")?.imageUrl || "/placeholder.svg"}
            alt="The making of Thekua"
            fill
            className="object-cover"
            data-ai-hint="making sweets"
          />
        </div>
        <div className="prose prose-lg mx-auto max-w-none dark:prose-invert prose-p:text-muted-foreground">
          <p>
            Thekua Delight was born from a simple yet profound desire: to share a piece of our Bihari heritage with the world. Our journey began not in a factory, but in a warm family kitchen, filled with the aroma of cardamom, ghee, and a recipe passed down through countless generations. This isn't just a business for us; it's a mission to preserve a legacy.
          </p>
          <p>
            We believe in authenticity above all else. In a world of mass-produced snacks, we stand for tradition. We meticulously source the finest natural ingredients – from the whole wheat flour to the purest ghee and the rich, unrefined jaggery. Every Thekua is handcrafted with the same love and attention to detail that our grandmothers poured into them.
          </p>
          <p>
            For us, each Thekua is more than just a snack. It's a vessel of memories, a celebration of culture, a testament to family gatherings, and a symbol of the timeless traditions of Bihar. We invite you to take a bite and experience the authentic taste of home.
          </p>
        </div>
      </div>
    </div>
  );
}
