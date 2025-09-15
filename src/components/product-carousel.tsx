"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/lib/types";

interface ProductCarouselProps {
  products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2">
        {products.map((product, index) => (
          <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-2 md:pl-4">
              <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
}
