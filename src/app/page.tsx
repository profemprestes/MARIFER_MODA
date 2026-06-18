
"use client";

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/ecommerce/Navbar';
import { CategoryScroll } from '@/components/ecommerce/CategoryScroll';
import { ProductCard } from '@/components/ecommerce/ProductCard';
import { mockProducts } from '@/data/mockProducts';
import { Category } from '@/types';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const categoryMatch = selectedCategory === 'Todos' || product.category === selectedCategory;
      const searchMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section - Visual focus */}
        <section className="bg-primary/5 py-10 md:py-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Nueva Colección 2024</span>
              <h1 className="font-headline text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6">
                Sentite cómoda,<br /><span className="text-primary">sentite vos.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-8">
                Prendas diseñadas para el día a día. Calidad premium con los mejores precios de plaza en Uruguay.
              </p>
            </div>
          </div>
        </section>

        {/* Filters & Search */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm shadow-sm border-b">
          <div className="container mx-auto py-2">
            <CategoryScroll 
              selected={selectedCategory} 
              onSelect={setSelectedCategory} 
            />
            <div className="px-4 pb-4 md:hidden">
               <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar prendas..." 
                  className="pl-10 h-11 bg-white" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
               </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-2xl font-bold">
              {selectedCategory === 'Todos' ? 'Nuestros Productos' : selectedCategory}
              <span className="ml-3 text-sm font-normal text-muted-foreground">({filteredProducts.length})</span>
            </h2>
            <div className="hidden md:block w-72 relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <Input 
                  placeholder="Buscar prendas..." 
                  className="pl-10 bg-white" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-2">No encontramos nada</h3>
              <p className="text-muted-foreground">Intentá con otros filtros o términos de búsqueda.</p>
              <button 
                onClick={() => {setSelectedCategory('Todos'); setSearchQuery('');}}
                className="mt-6 text-primary font-bold underline"
              >
                Ver todos los productos
              </button>
            </div>
          )}
        </section>

        {/* Quality Banner */}
        <section className="bg-secondary/30 py-12 border-y mt-12">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <h4 className="font-headline font-bold text-lg uppercase tracking-wider">Envíos DAC / Mirtrans</h4>
              <p className="text-sm text-muted-foreground">Despachamos en el día a todo el país.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-headline font-bold text-lg uppercase tracking-wider">Hasta 12 Cuotas</h4>
              <p className="text-sm text-muted-foreground">Pagá como quieras a través de MercadoPago.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-headline font-bold text-lg uppercase tracking-wider">Atención Humana</h4>
              <p className="text-sm text-muted-foreground">Tus dudas las resolvemos por WhatsApp.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4 text-center space-y-4">
          <span className="font-headline text-2xl font-black text-primary tracking-tighter">MARIFER MODA</span>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            La tienda online preferida de las uruguayas. Moda accesible, real y con envíos rápidos.
          </p>
          <div className="flex justify-center gap-6 py-4">
            <a href="#" className="text-muted-foreground hover:text-primary">Instagram</a>
            <a href="#" className="text-muted-foreground hover:text-primary">Facebook</a>
            <a href="#" className="text-muted-foreground hover:text-primary">TikTok</a>
          </div>
          <div className="pt-8 border-t text-[10px] text-muted-foreground uppercase tracking-widest">
            © 2024 MARIFER MODA - HECHO CON AMOR EN URUGUAY
          </div>
        </div>
      </footer>
    </div>
  );
}
