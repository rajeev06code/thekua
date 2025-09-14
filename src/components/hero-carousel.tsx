
"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface HeroCarouselProps {
  images: {
    id: string;
    description: string;
    imageUrl: string;
    imageHint: string;
  }[];
}

export function HeroCarousel({ images }: HeroCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <div className="relative w-full h-[40vh] md:h-[50vh]">
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover"
                priority={images.indexOf(image) === 0}
                data-ai-hint={image.imageHint}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
