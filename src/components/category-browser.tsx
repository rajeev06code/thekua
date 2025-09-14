"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ProductCard } from './product-card';
import { Product } from '@/lib/types';
import placeholderImages from '@/lib/placeholder-images.json';

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
            <div className="flex flex-wrap items-center justify-center gap-8">
                {categories.map((category) => {
                    const imageUrl = placeholderImages.placeholderImages.find(p => p.id === category.image)?.imageUrl || "/placeholder.svg";
                    return (
                        <div key={category.name} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => handleCategoryClick(category)}>
                            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-transparent group-hover:border-primary transition-all duration-300 shadow-lg">
                                <Image
                                    src={imageUrl}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                    data-ai-hint="thekua snacks"
                                />
                            </div>
                            <h3 className="font-semibold text-lg text-muted-foreground group-hover:text-primary transition-colors">{category.name}</h3>
                        </div>
                    )
                })}
            </div>

            {selectedCategory && (
                 <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
                    <DialogContent className="sm:max-w-4xl">
                        <DialogHeader>
                            <DialogTitle className="text-3xl font-headline">{selectedCategory.name} Products</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6 max-h-[70vh] overflow-y-auto pr-4">
                            {productsForCategory.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
