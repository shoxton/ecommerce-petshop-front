import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BoxIcon, CreditCardIcon, LayoutDashboardIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="p-2 border rounded-sm">
            <span className="text-xl font-medium leading-none">Brand</span>
          </div>
          <nav></nav>
          <Button variant={'ghost'} className="h-8 w-8 rounded-full">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <nav>
            <ul className="space-y-1 flex-col">
              <li>
                <Button
                  className="w-full justify-start"
                  size={'sm'}
                  variant={'ghost'}
                  asChild
                >
                  <Link href={'/dashboard/overview'}>
                    <LayoutDashboardIcon className="mr-2" />
                    Overview
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  className="w-full justify-start"
                  size={'sm'}
                  variant={'ghost'}
                  asChild
                >
                  <Link href={'/dashboard/orders'}>
                    <CreditCardIcon className="mr-2" />
                    Orders
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  className="w-full justify-start"
                  size={'sm'}
                  variant={'ghost'}
                  asChild
                >
                  <Link href={'/dashboard/products'}>
                    <BoxIcon className="mr-2" />
                    Products
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <footer></footer>
    </div>
  );
}
