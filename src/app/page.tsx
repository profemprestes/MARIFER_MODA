"use client";

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/ecommerce/Navbar';
import { CategoryScroll } from '@/components/ecommerce/CategoryScroll';
import { ProductCard } from '@/components/ecommerce/ProductCard';
import { mockProducts } from '@/data/mockProducts';
import { Category } from '@/types';
import { Search, ShoppingBag, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
    <div className="min-h-screen flex flex-col bg-marifer-bg">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section - High conversion focus */}
        <section className="relative bg-white pt-10 pb-12 md:py-20 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <span className="text-marifer-primary font-bold tracking-[0.25em] text-[10px] uppercase mb-4 block">Colección 2024</span>
              <h1 className="font-headline text-4xl md:text-7xl font-black text-marifer-dark leading-[1.05] mb-6">
                Tu moda de todos los días. <span className="text-marifer-primary">Ropa linda, cómoda y accesible.</span>
              </h1>
              <p className="text-base md:text-xl text-marifer-dark/60 leading-relaxed max-w-xl mb-10 font-body">
                Diseñamos prendas reales para mujeres reales. Calidad premium al mejor precio de plaza en todo Uruguay.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="h-14 px-10 rounded-2xl font-bold text-lg bg-marifer-primary hover:bg-marifer-primary/90 shadow-xl shadow-marifer-primary/20"
                  onClick={() => {
                    const el = document.getElementById('catalog');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Ver Catálogo <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <div className="flex items-center gap-3 px-4 py-3 bg-marifer-bg rounded-2xl border border-marifer-primary/10">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <ShoppingBag className="w-5 h-5 text-marifer-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-marifer-dark">Envíos a todo el país</p>
                    <p className="text-[10px] text-marifer-dark/50">DAC / Mirtrans</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-marifer-primary/5 to-transparent hidden lg:block" />
        </section>

        {/* Filters & Search sticky bar */}
        <div id="catalog" className="sticky top-16 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-marifer-primary/5">
          <div className="container mx-auto py-1">
            <CategoryScroll 
              selected={selectedCategory} 
              onSelect={setSelectedCategory} 
            />
            <div className="px-4 pb-4 md:hidden">
               <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-marifer-dark/40" />
                <Input 
                  placeholder="Buscar prendas..." 
                  className="pl-10 h-12 bg-marifer-bg border-none rounded-2xl placeholder:text-marifer-dark/30" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
               </div>
            </div>
          </div>
        </div>

        {/* Product Grid - Optimized 2-column mobile */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h2 className="font-headline text-2xl md:text-3xl font-black text-marifer-dark flex items-center gap-3">
              {selectedCategory === 'Todos' ? 'Nuestros Productos' : selectedCategory}
              <span className="text-sm font-medium bg-marifer-primary/10 text-marifer-primary px-3 py-1 rounded-full">{filteredProducts.length} items</span>
            </h2>
            <div className="hidden md:block w-80 relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-marifer-dark/40" />
               <Input 
                  placeholder="Buscar por nombre o descripción..." 
                  className="pl-12 h-12 bg-white border-marifer-primary/10 rounded-2xl focus-visible:ring-marifer-primary" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-marifer-primary/5 flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-marifer-primary/30" />
              </div>
              <h3 className="font-headline text-2xl font-bold text-marifer-dark mb-2">No encontramos resultados</h3>
              <p className="text-marifer-dark/50 max-w-xs mx-auto">Probá buscando otra cosa o volviendo a ver todas nuestras prendas.</p>
              <Button 
                onClick={() => {setSelectedCategory('Todos'); setSearchQuery('');}}
                variant="ghost"
                className="mt-6 text-marifer-primary font-bold hover:bg-marifer-primary/5"
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </section>

        {/* Features Banner */}
        <section className="bg-white py-16 border-y border-marifer-primary/5 mt-12">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-12 h-12 bg-marifer-bg rounded-2xl flex items-center justify-center text-marifer-primary mb-2">
                <ArrowRight className="w-6 h-6 rotate-[-45deg]" />
              </div>
              <h4 className="font-headline font-black text-marifer-dark text-lg uppercase tracking-wider">Envíos a Todo Uruguay</h4>
              <p className="text-sm text-marifer-dark/60 font-medium">DAC / Mirtrans. Despachamos tu pedido en menos de 24hs.</p>
            </div>
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-12 h-12 bg-marifer-bg rounded-2xl flex items-center justify-center text-marifer-primary mb-2">
                <ArrowRight className="w-6 h-6 rotate-[-45deg]" />
              </div>
              <h4 className="font-headline font-black text-marifer-dark text-lg uppercase tracking-wider">Todos los Medios de Pago</h4>
              <p className="text-sm text-marifer-dark/60 font-medium">MercadoPago hasta 12 cuotas sin recargo con todas las tarjetas.</p>
            </div>
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-12 h-12 bg-marifer-bg rounded-2xl flex items-center justify-center text-marifer-primary mb-2">
                <ArrowRight className="w-6 h-6 rotate-[-45deg]" />
              </div>
              <h4 className="font-headline font-black text-marifer-dark text-lg uppercase tracking-wider">Atención Directa</h4>
              <p className="text-sm text-marifer-dark/60 font-medium">Somos personas ayudando a personas. Resolvemos todo por WhatsApp.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-marifer-primary/5 py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <span className="font-headline text-3xl font-black text-marifer-dark tracking-tighter">MARIFER MODA</span>
          <p className="text-sm md:text-base text-marifer-dark/50 max-w-md mx-auto font-body">
            La tienda de confianza de miles de uruguayas. Moda accesible y real con envíos rápidos a todo el país.
          </p>
          <div className="flex justify-center gap-8 py-4">
            <a href="#" className="text-marifer-dark/70 hover:text-marifer-primary font-bold text-sm transition-colors">Instagram</a>
            <a href="#" className="text-marifer-dark/70 hover:text-marifer-primary font-bold text-sm transition-colors">Facebook</a>
            <a href="#" className="text-marifer-dark/70 hover:text-marifer-primary font-bold text-sm transition-colors">TikTok</a>
          </div>
          <div className="pt-12 border-t border-marifer-primary/5 text-[10px] text-marifer-dark/30 font-bold uppercase tracking-[0.3em]">
            © 2024 MARIFER MODA - HECHO CON AMOR EN URUGUAY
          </div>
        </div>
      </footer>
    </div>
  );
}
