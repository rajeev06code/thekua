
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
        {images.map((image, index) => (
          <CarouselItem key={image.id || index}>
            <div className="relative w-full h-[60vh] md:h-[60vh]">
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover"
                priority={index === 0}
                data-ai-hint={image.imageHint}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}


    