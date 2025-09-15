"use client";

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { CheckoutFlowModal } from './checkout-flow-modal';

export function CartIcon() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <CheckoutFlowModal>
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
        <span className="sr-only">Shopping Cart</span>
        {totalItems > 0 && (
          <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
            {totalItems}
          </span>
        )}
      </Button>
    </CheckoutFlowModal>
  );
}
