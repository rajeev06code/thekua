"use client";

import { useState } from 'react';
import { products as allProducts } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    packSize: 'all',
    price: 'all',
    category: 'all',
  });

  const handleFilterChange = (type: string, value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const filteredProducts = allProducts.filter(product => {
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = filters.category === 'all' || product.category === filters.category;
    const packSizeMatch = filters.packSize === 'all' || product.packSizes.includes(filters.packSize);

    const priceMatch = filters.price === 'all' || 
      (filters.price === 'under-300' && product.price < 300) ||
      (filters.price === '300-500' && product.price >= 300 && product.price <= 500) ||
      (filters.price === 'over-500' && product.price > 500);

    return searchMatch && categoryMatch && packSizeMatch && priceMatch;
  });

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold">Our Products</h1>
        <p className="mt-2 text-muted-foreground">Explore our range of authentic Bihari Thekua.</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Input
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
          <SelectTrigger><SelectValue placeholder="Filter by category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="single">Single Packs</SelectItem>
            <SelectItem value="combo">Combo Packs</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.packSize} onValueChange={(value) => handleFilterChange('packSize', value)}>
          <SelectTrigger><SelectValue placeholder="Filter by pack size" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Pack Sizes</SelectItem>
            <SelectItem value="250g">250g</SelectItem>
            <SelectItem value="500g">500g</SelectItem>
            <SelectItem value="750g">750g</SelectItem>
            <SelectItem value="1kg">1kg</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.price} onValueChange={(value) => handleFilterChange('price', value)}>
          <SelectTrigger><SelectValue placeholder="Filter by price" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="under-300">Under ₹300</SelectItem>
            <SelectItem value="300-500">₹300 - ₹500</SelectItem>
            <SelectItem value="over-500">Over ₹500</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center py-16">
            <h2 className="text-2xl font-semibold">No products found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
