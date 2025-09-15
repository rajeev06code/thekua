
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { CartItem } from '@/lib/types';
import placeholderImages from '@/lib/placeholder-images.json';

interface OrderDetails {
  orderId: string;
  items: CartItem[];
  total: number;
  // Add other details you stored
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem('lastOrder');
    if (storedOrder) {
      const parsedOrder = JSON.parse(storedOrder);
      // Ensure the order in localStorage matches the one in the URL
      if (parsedOrder.orderId === orderId) {
        setOrder(parsedOrder);
      }
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="container flex items-center justify-center py-24 text-center">
        <div>
            <h1 className="text-2xl font-bold">Looking for your order...</h1>
            <p className="text-muted-foreground">If you are not redirected, please check your order history.</p>
             <Button asChild className="mt-4">
                <Link href="/account/orders">View My Orders</Link>
            </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <Card className="mx-auto max-w-2xl">
        <CardHeader className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
          <CardTitle className="mt-4 text-3xl font-bold">Thank you for your order!</CardTitle>
          <p className="text-muted-foreground">
            Your order <span className="font-semibold text-primary">{order.orderId}</span> has been placed.
          </p>
        </CardHeader>
        <CardContent>
          <Separator className="my-6" />
          <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
          <div className="space-y-4">
            {order.items.map(item => {
              const imageUrl = placeholderImages.placeholderImages.find(p => p.id === item.image.id)?.imageUrl || "/placeholder.svg";
              return (
                <div key={`${item.id}-${item.packSize}`} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden">
                    <Image src={imageUrl} alt={item.image.alt} fill className="object-cover" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">{item.quantity}</span>
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.packSize}</p>
                  </div>
                  <p className="text-sm font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              );
            })}
          </div>
          <Separator className="my-6" />
          <div className="space-y-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/account/orders">View My Orders</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
