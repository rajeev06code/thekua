"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingCart, X } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import placeholderImages from '@/lib/placeholder-images.json';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

export function CartModal({ children }: { children: React.ReactNode }) {
  const { cartItems, updateQuantity, removeItem, getCartTotal, getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const cartTotal = getCartTotal();
  const shippingCost = cartTotal > 500 ? 0 : 50;
  const grandTotal = cartTotal + shippingCost;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg md:max-w-2xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">Your Shopping Cart</DialogTitle>
        </DialogHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 flex-grow">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground">Looks like you haven't added anything yet.</p>
          </div>
        ) : (
          <>
          <ScrollArea className="flex-grow">
            <div className="space-y-4 pr-6">
              {cartItems.map(item => {
                const imageUrl = placeholderImages.placeholderImages.find(p => p.id === item.image.id)?.imageUrl || "/placeholder.svg";
                return (
                  <div key={`${item.id}-${item.packSize}`} className="flex items-center gap-4">
                    <Image src={imageUrl} alt={item.image.alt} width={80} height={80} className="rounded-md object-cover" />
                    <div className="flex-grow">
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
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id, item.packSize)}>
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                );
              })}
            </div>
            </ScrollArea>
             <DialogFooter className="border-t pt-4 flex-col items-stretch gap-4 mt-auto">
              <div className="space-y-2">
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
              </div>
              <Button size="lg" className="w-full">
                Proceed to Checkout
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
