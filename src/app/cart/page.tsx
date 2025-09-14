"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import placeholderImages from '@/lib/placeholder-images.json';

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem, getCartTotal, getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const cartTotal = getCartTotal();
  const shippingCost = cartTotal > 500 ? 0 : 50;
  const grandTotal = cartTotal + shippingCost;

  return (
    <div className="container py-12 md:py-16">
      <h1 className="mb-8 font-headline text-3xl font-bold">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16 rounded-lg border-2 border-dashed">
            <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
            <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="mt-6">
                <Link href="/products">Start Shopping</Link>
            </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map(item => {
                const imageUrl = placeholderImages.placeholderImages.find(p => p.id === item.image.id)?.imageUrl || "/placeholder.svg";
                return (
                  <Card key={`${item.id}-${item.packSize}`} className="flex items-center p-4">
                    <Image src={imageUrl} alt={item.image.alt} width={100} height={100} className="rounded-md object-cover" />
                    <div className="ml-4 flex-grow">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Size: {item.packSize}</p>
                      <p className="text-sm font-semibold">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.packSize, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.packSize, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-4 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id, item.packSize)}>
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost > 0 ? `₹${shippingCost.toFixed(2)}` : 'Free'}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Grand Total</span>
                  <span>₹{grandTotal.toFixed(2)}</span>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
