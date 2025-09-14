import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const orders = [
  {
    id: '#TD-8923',
    date: 'June 23, 2024',
    status: 'Delivered',
    total: '₹800.00',
  },
  {
    id: '#TD-8922',
    date: 'May 15, 2024',
    status: 'Delivered',
    total: '₹280.00',
  },
   {
    id: '#TD-8921',
    date: 'April 02, 2024',
    status: 'Cancelled',
    total: '₹350.00',
  },
];

export default function OrdersPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold">My Orders</h1>
        <Button asChild variant="outline">
            <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-primary hover:underline">
                    <Link href="#">{order.id}</Link>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === 'Delivered' ? 'default' : 'destructive'} className={`${order.status === 'Delivered' ? 'bg-green-600' : ''}`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       {orders.length === 0 && (
         <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-4">You haven't placed any orders with us yet. Let's change that!</p>
         </div>
      )}
    </div>
  );
}
