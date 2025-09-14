import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListOrdered, LogOut, MapPin, User } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="container py-12 md:py-16">
      <h1 className="mb-8 font-headline text-3xl font-bold">My Account</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>John Doe</CardTitle>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Link href="/account/orders">
              <Card className="h-full transition-all hover:border-primary hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>My Orders</CardTitle>
                  <ListOrdered className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">View your order history and track current orders.</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/account/addresses">
              <Card className="h-full transition-all hover:border-primary hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>My Addresses</CardTitle>
                  <MapPin className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Manage your shipping and billing addresses.</p>
                </CardContent>
              </Card>
            </Link>
             <Link href="/account/profile">
              <Card className="h-full transition-all hover:border-primary hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Profile Details</CardTitle>
                  <User className="h-6 w-6 text-primary" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Edit your personal information and password.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
