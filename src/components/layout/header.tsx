"use client";

import Link from 'next/link';
import { Menu, User } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CartIcon } from '@/components/cart-icon';
import { LoginModal } from '@/components/login-modal';
import { RegisterModal } from '@/components/register-modal';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'Our Story' },
  { href: '/blog', label: 'Blog' },
];

export function Header() {

  const NavLink = ({ href, label }: { href: string, label: string }) => (
    <Link
      href={href}
      className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>

        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => <NavLink key={link.href} {...link} />)}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden md:flex items-center gap-2">
             <LoginModal>
              <Button variant="ghost" size="sm">
                <User className="mr-2 h-4 w-4" />
                Login
              </Button>
            </LoginModal>
            <RegisterModal>
               <Button variant="outline" size="sm">
                Sign Up
              </Button>
            </RegisterModal>
          </div>
          <CartIcon />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 p-4">
                <Link href="/" className="mb-4">
                  <Logo />
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t pt-4 space-y-2">
                  <LoginModal>
                    <Button variant="ghost" className="w-full justify-start">Login</Button>
                  </LoginModal>
                  <RegisterModal>
                     <Button variant="outline" className="w-full justify-start">Sign Up</Button>
                  </RegisterModal>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
