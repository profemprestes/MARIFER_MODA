"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Product, Size } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const hasDiscount = !!product.originalPrice;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize);
      setIsOpen(false);
      setSelectedSize(null);
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-marifer-primary/5 hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden bg-marifer-bg">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          data-ai-hint="fashion clothes"
        />
        {hasDiscount && (
          <Badge className="absolute top-2 left-2 bg-marifer-primary text-[10px] px-2 py-0" variant="default">
            {discountPercentage}% OFF
          </Badge>
        )}
      </div>

      <div className="p-3 md:p-4 flex flex-col gap-1.5">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-marifer-primary/60 uppercase tracking-widest">{product.category}</span>
          <h3 className="font-headline text-sm md:text-base font-bold text-marifer-dark leading-tight truncate">{product.title}</h3>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-headline text-lg md:text-xl font-extrabold text-marifer-dark">
            ${product.price.toLocaleString('es-UY')}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through decoration-marifer-primary/30">
              ${product.originalPrice?.toLocaleString('es-UY')}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[10px] font-bold text-marifer-whatsapp uppercase tracking-tight">
            Hasta 12 cuotas sin recargo
          </span>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mt-1.5 font-bold bg-marifer-primary hover:bg-marifer-primary/90 rounded-xl" size="sm">
              Ver detalles
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl text-marifer-dark">{product.title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-marifer-primary/10">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-sm text-marifer-dark/70 leading-relaxed font-body">
                  {product.description}
                </p>
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-marifer-dark">Seleccionar Talle</Label>
                  <RadioGroup 
                    onValueChange={(val) => setSelectedSize(val as Size)}
                    className="flex flex-wrap gap-2"
                  >
                    {product.variants.map((v) => (
                      <div key={v.size} className="flex items-center">
                        <RadioGroupItem
                          value={v.size}
                          id={`size-${product.id}-${v.size}`}
                          className="peer sr-only"
                          disabled={v.stock === 0}
                        />
                        <Label
                          htmlFor={`size-${product.id}-${v.size}`}
                          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border-2 border-muted bg-white text-sm font-bold ring-offset-background transition-all peer-data-[state=checked]:border-marifer-primary peer-data-[state=checked]:bg-marifer-primary peer-data-[state=checked]:text-white hover:bg-marifer-bg peer-disabled:opacity-20 peer-disabled:cursor-not-allowed"
                        >
                          {v.size}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={handleAddToCart} 
                disabled={!selectedSize}
                className="w-full h-14 font-bold text-lg bg-marifer-primary hover:bg-marifer-primary/90 rounded-2xl"
              >
                Agregar al Carrito
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
