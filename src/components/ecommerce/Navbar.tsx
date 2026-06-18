"use client";

import React from 'react';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { CartDrawer } from './CartDrawer';

export const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6 text-marifer-dark" />
          </Button>
          <span className="font-headline text-xl font-extrabold tracking-tighter text-marifer-dark">
            MARIFER MODA
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-semibold text-marifer-dark/70 hover:text-marifer-primary transition-colors">Inicio</a>
          <a href="#" className="text-sm font-semibold text-marifer-dark/70 hover:text-marifer-primary transition-colors">Novedades</a>
          <a href="#" className="text-sm font-semibold text-marifer-dark/70 hover:text-marifer-primary transition-colors">Ofertas</a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-marifer-dark">
            <Search className="w-5 h-5" />
          </Button>
          
          <CartDrawer>
            <Button variant="ghost" size="icon" className="relative text-marifer-dark">
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-marifer-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </CartDrawer>
        </div>
      </div>
    </header>
  );
};
