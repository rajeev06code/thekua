"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingCart, X, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import placeholderImages from '@/lib/placeholder-images.json';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { CartItem } from '@/lib/types';

type CheckoutStep = 'cart' | 'checkout' | 'confirmation';

const checkoutSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'ZIP code is required'),
  paymentMethod: z.enum(['card', 'upi', 'cod']),
  saveInfo: z.boolean().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface OrderDetails {
  orderId: string;
  items: CartItem[];
  total: number;
}

export function CheckoutFlowModal({ children }: { children: React.ReactNode }) {
  const { cartItems, updateQuantity, removeItem, getCartTotal, getTotalItems, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: 'card' }
  });

  const totalItems = getTotalItems();
  const cartTotal = getCartTotal();
  const shippingCost = cartTotal > 500 ? 0 : 50;
  const grandTotal = cartTotal + shippingCost;

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset to cart view when modal is closed
      setTimeout(() => setStep('cart'), 300);
    }
  };

  const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
    const orderId = `TD-${Math.floor(Math.random() * 9000) + 1000}`;
    const newOrderDetails: OrderDetails = {
      orderId,
      items: cartItems,
      total: grandTotal,
    };
    setOrderDetails(newOrderDetails);
    clearCart();
    setStep('confirmation');
  };

  const CartView = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl">Your Shopping Cart</DialogTitle>
      </DialogHeader>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 flex-grow">
          <ShoppingCart className="h-16 w-16 text-muted-foreground" />
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground">Looks like you haven't added anything yet.</p>
           <Button asChild onClick={() => setIsOpen(false)}>
              <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-grow my-4 -mr-6">
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
              <div className="flex justify-between"><span>Subtotal ({totalItems} items)</span><span>₹{cartTotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shippingCost > 0 ? `₹${shippingCost.toFixed(2)}` : 'Free'}</span></div>
              <Separator />
              <div className="flex justify-between font-bold text-lg"><span>Grand Total</span><span>₹{grandTotal.toFixed(2)}</span></div>
            </div>
            <Button size="lg" className="w-full" onClick={() => setStep('checkout')}>
              Proceed to Checkout
            </Button>
          </DialogFooter>
        </>
      )}
    </>
  );

  const CheckoutView = () => (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center text-2xl">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => setStep('cart')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          Checkout
        </DialogTitle>
      </DialogHeader>
      <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="flex-grow overflow-y-auto pr-2 py-4 -mr-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
                <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" {...register('firstName')} />
                        {errors.firstName && <p className="text-sm text-destructive mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" {...register('lastName')} />
                        {errors.lastName && <p className="text-sm text-destructive mt-1">{errors.lastName.message}</p>}
                    </div>
                 </div>
                 <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St" {...register('address')} />
                    {errors.address && <p className="text-sm text-destructive mt-1">{errors.address.message}</p>}
                 </div>
                 <div className="grid grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Patna" {...register('city')} />
                        {errors.city && <p className="text-sm text-destructive mt-1">{errors.city.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="Bihar" {...register('state')} />
                        {errors.state && <p className="text-sm text-destructive mt-1">{errors.state.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="zip">ZIP</Label>
                        <Input id="zip" placeholder="800001" {...register('zip')} />
                        {errors.zip && <p className="text-sm text-destructive mt-1">{errors.zip.message}</p>}
                    </div>
                 </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="save-info" {...register('saveInfo')} />
                    <Label htmlFor="save-info">Save this information for next time</Label>
                 </div>
                  <div>
                    <Label>Payment</Label>
                    <RadioGroup defaultValue="card" className="mt-2 space-y-2" {...register('paymentMethod')}>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="card" id="card" /><Label htmlFor="card">Credit/Debit Card</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="upi" id="upi" /><Label htmlFor="upi">UPI</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="cod" id="cod" /><Label htmlFor="cod">Cash on Delivery</Label></div>
                    </RadioGroup>
                  </div>
            </div>
            <div className="space-y-4 bg-secondary/50 rounded-lg p-4 h-fit">
              <h3 className="font-semibold">Order Summary</h3>
               <div className="space-y-2 max-h-48 overflow-y-auto pr-2 border-t border-b py-2">
                  {cartItems.map(item => {
                    const imageUrl = placeholderImages.placeholderImages.find(p => p.id === item.image.id)?.imageUrl || "/placeholder.svg";
                    return (
                      <div key={`${item.id}-${item.packSize}`} className="flex items-center gap-2">
                        <Image src={imageUrl} alt={item.image.alt} width={48} height={48} className="rounded-md" />
                        <div className="flex-grow"><p className="font-medium text-sm">{item.name}</p><p className="text-xs text-muted-foreground">{item.quantity} x {item.packSize}</p></div>
                        <p className="text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm"><span>Subtotal</span><span>₹{cartTotal.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm"><span>Shipping</span><span>{shippingCost > 0 ? `₹${shippingCost.toFixed(2)}` : 'Free'}</span></div>
                    <Separator/>
                    <div className="flex justify-between font-bold"><span>Total</span><span>₹{grandTotal.toFixed(2)}</span></div>
                </div>
            </div>
        </div>
      </form>
      <DialogFooter className="border-t pt-4">
        <Button type="submit" form="checkout-form" size="lg" className="w-full" disabled={cartItems.length === 0}>
          Place Order
        </Button>
      </DialogFooter>
    </>
  );

  const ConfirmationView = () => (
    <>
      <DialogHeader className="text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
        <DialogTitle className="mt-4 text-3xl font-bold">Thank you!</DialogTitle>
        <p className="text-muted-foreground">Your order <span className="font-semibold text-primary">{orderDetails?.orderId}</span> has been placed.</p>
      </DialogHeader>
      <div className="my-6">
        <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
        <ScrollArea className="max-h-60 -mr-6">
          <div className="space-y-4 pr-6">
            {orderDetails?.items.map(item => {
              const imageUrl = placeholderImages.placeholderImages.find(p => p.id === item.image.id)?.imageUrl || "/placeholder.svg";
              return (
                <div key={`${item.id}-${item.packSize}`} className="flex items-center gap-4">
                  <Image src={imageUrl} alt={item.image.alt} width={64} height={64} className="rounded-md object-cover" />
                  <div className="flex-grow">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.packSize} x {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        <Separator className="my-4" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total Paid</span>
          <span>₹{orderDetails?.total.toFixed(2)}</span>
        </div>
      </div>
      <DialogFooter className="flex-col gap-2">
        <Button onClick={() => setIsOpen(false)} size="lg" className="w-full">
            Continue Shopping
        </Button>
        <Button asChild variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
            <Link href="/account/orders">View My Orders</Link>
        </Button>
      </DialogFooter>
    </>
  );

  const renderStep = () => {
    switch (step) {
      case 'checkout': return <CheckoutView />;
      case 'confirmation': return <ConfirmationView />;
      case 'cart':
      default: return <CartView />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl md:max-w-3xl lg:max-w-4xl h-[90vh] flex flex-col">
        {renderStep()}
      </DialogContent>
    </Dialog>
  );
}
