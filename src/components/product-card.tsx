"use client";

import Image from 'next/image';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import placeholderImages from '@/lib/placeholder-images.json';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const firstImage = product.images[0];
  const imageUrl = placeholderImages.placeholderImages.find(p => p.id === firstImage.id)?.imageUrl || "/placeholder.svg";

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity: 1,
      packSize: product.packSizes[0]
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block overflow-hidden">
          <Image
            src={imageUrl}
            alt={firstImage.alt}
            width={600}
            height={400}
            className="aspect-[3/2] w-full object-cover transition-transform duration-300 hover:scale-110"
            data-ai-hint="thekua snacks"
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="mb-1 text-lg">
          <Link href={`/products/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-lg font-semibold">₹{product.price.toFixed(2)}</p>
        <Button size="sm" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
