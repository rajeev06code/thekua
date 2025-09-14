"use client";

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { Star, ShoppingCart, Minus, Plus } from 'lucide-react';
import { products } from '@/lib/data';
import { useCart } from '@/hooks/use-cart';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import placeholderImages from '@/lib/placeholder-images.json';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedPackSize, setSelectedPackSize] = useState(product?.packSizes[0] || '');

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity: quantity,
      packSize: selectedPackSize,
    });
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} (${selectedPackSize}) added to your cart.`,
    });
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((image, index) => {
                 const imageUrl = placeholderImages.placeholderImages.find(p => p.id === image.id)?.imageUrl || "/placeholder.svg";
                 return (
                  <CarouselItem key={index}>
                    <Card className="overflow-hidden">
                      <Image src={imageUrl} alt={image.alt} width={800} height={600} className="aspect-[4/3] w-full object-cover" />
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold md:text-4xl">{product.name}</h1>
          <div className="my-4 flex items-center gap-2">
            <div className="flex text-accent">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5" fill="currentColor" />)}
            </div>
            <span className="text-sm text-muted-foreground">(12 reviews)</span>
          </div>
          <p className="text-2xl font-semibold text-primary">₹{product.price.toFixed(2)}</p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          
          <Separator className="my-6" />

          <div>
            <Label className="font-semibold">Pack Size</Label>
            <RadioGroup value={selectedPackSize} onValueChange={setSelectedPackSize} className="mt-2 flex gap-4">
              {product.packSizes.map(size => (
                <Label key={size} htmlFor={size} className={`flex cursor-pointer items-center justify-center rounded-md border p-4 transition-colors hover:border-primary ${selectedPackSize === size ? 'border-primary bg-primary/10' : ''}`}>
                  <RadioGroupItem value={size} id={size} className="sr-only" />
                  <span>{size}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-md border">
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center font-semibold">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button size="lg" className="flex-grow" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="font-headline text-2xl font-bold">Product Details</h2>
        <Separator className="my-4" />
        <div className="prose dark:prose-invert max-w-none">
          <p>{product.longDescription}</p>
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="font-headline text-2xl font-bold">Customer Reviews</h2>
        <Separator className="my-4" />
        <div className="space-y-6">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center mb-2">
                        <Avatar>
                            <AvatarImage src="https://picsum.photos/seed/cr1/40/40" />
                            <AvatarFallback>RS</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <p className="font-semibold">Rohan Singh</p>
                            <div className="flex text-accent mt-1">
                                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4" fill="currentColor" />)}
                            </div>
                        </div>
                    </div>
                    <p className="text-muted-foreground">Authentic taste! Reminds me of my home in Bihar. The packaging was excellent and delivery was on time.</p>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center mb-2">
                         <Avatar>
                            <AvatarImage src="https://picsum.photos/seed/cr2/40/40" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                            <p className="font-semibold">Aisha Das</p>
                            <div className="flex text-accent mt-1">
                                {[...Array(4)].map((_, i) => <Star key={i} className="h-4 w-4" fill="currentColor" />)}
                                <Star className="h-4 w-4 text-muted-foreground/50" fill="none" />
                            </div>
                        </div>
                    </div>
                    <p className="text-muted-foreground">Very tasty and crunchy. A bit expensive, but the quality is worth it. The coconut flavor is subtle and nice.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
