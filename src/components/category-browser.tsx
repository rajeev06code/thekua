"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ProductCard } from './product-card';
import { Product } from '@/lib/types';
import placeholderImages from '@/lib/placeholder-images.json';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Category {
    name: string;
    image: string;
}

interface CategoryBrowserProps {
    categories: Category[];
    products: Product[];
}

export function CategoryBrowser({ categories, products }: CategoryBrowserProps) {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleCategoryClick = (category: Category) => {
        setSelectedCategory(category);
        setModalOpen(true);
    };

    const productsForCategory = selectedCategory
        ? products.filter(p => p.category.toLowerCase() === selectedCategory.name.toLowerCase())
        : [];

    return (
        <>
            <div className="md:flex md:flex-wrap md:items-center md:justify-center md:gap-8">
                <div className="flex gap-4 overflow-x-auto pb-4 md:flex-wrap md:justify-center md:gap-8 md:overflow-x-visible md:pb-0">
                    {categories.map((category, index) => {
                        const imageUrl = placeholderImages.placeholderImages.find(p => p.id === category.image)?.imageUrl || "/placeholder.svg";
                        return (
                            <div 
                                key={category.name} 
                                className={cn(
                                    "flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0 w-28",
                                    index === categories.length - 1 ? "pr-16 md:pr-0" : ""
                                )}
                                onClick={() => handleCategoryClick(category)}
                            >
                                <div className="relative h-28 w-28 rounded-full overflow-hidden border-4 border-transparent group-hover:border-primary transition-all duration-300 shadow-lg">
                                    <Image
                                        src={imageUrl}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                        data-ai-hint="thekua snacks"
                                    />
                                </div>
                                <h3 className="font-semibold text-base text-muted-foreground group-hover:text-primary transition-colors text-center">{category.name}</h3>
                            </div>
                        )
                    })}
                </div>
            </div>

            {selectedCategory && (
                 <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
                    <DialogContent className="w-full max-w-4xl h-[90vh] flex flex-col">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-headline">{selectedCategory.name} Products</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="flex-grow">
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6 pr-6">
                                {productsForCategory.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
