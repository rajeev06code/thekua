"use client";

import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
import { ShoppingCart, Eye } from 'lucide-react';
import { useState } from 'react';

import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import placeholderImages from '@/lib/placeholder-images.json';
import { ProductDetailModal } from './product-detail-modal';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const firstImage = product.images[0];
  const imageUrl = placeholderImages.placeholderImages.find(p => p.id === firstImage.id)?.imageUrl || "/placeholder.svg";
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
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
    <>
    <Card className="w-full max-w-sm mx-auto flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <CardHeader className="p-0">
        <div className="block overflow-hidden relative">
          <Image
            src={imageUrl}
            alt={firstImage.alt}
            width={300}
            height={200}
            className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-110"
            data-ai-hint="thekua snacks"
          />
           <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="secondary" onClick={() => setDetailModalOpen(true)}>
                <Eye className="mr-2 h-4 w-4" />
                Quick View
              </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-3">
        <CardTitle className="mb-1 text-base">
          <span className="cursor-pointer hover:text-primary" onClick={() => setDetailModalOpen(true)}>
            {product.name}
          </span>
        </CardTitle>
        <CardDescription className="line-clamp-2 text-xs">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-3 pt-0">
        <p className="text-base font-semibold">₹{product.price.toFixed(2)}</p>
        <Button size="sm" className="text-xs" onClick={handleAddToCart}>
          <ShoppingCart className="mr-1.5 h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
    <ProductDetailModal isOpen={isDetailModalOpen} setIsOpen={setDetailModalOpen} product={product} />
    </>
  );
}
