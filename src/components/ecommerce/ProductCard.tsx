
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
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-md transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          data-ai-hint="fashion product"
        />
        {hasDiscount && (
          <Badge className="absolute top-3 left-3 bg-primary" variant="default">
            {discountPercentage}% OFF
          </Badge>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{product.category}</span>
          <h3 className="font-headline text-lg font-bold leading-tight line-clamp-1">{product.title}</h3>
        </div>

        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-headline text-xl font-extrabold text-foreground">
            ${product.price.toLocaleString('es-UY')}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice?.toLocaleString('es-UY')}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[10px] md:text-xs font-bold text-success uppercase">
            Hasta 12 cuotas sin recargo
          </span>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mt-2 font-bold" variant="default">
              Ver prendas
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">{product.title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden border">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <div className="space-y-2">
                  <Label className="text-sm font-bold">Seleccionar Talle</Label>
                  <RadioGroup 
                    onValueChange={(val) => setSelectedSize(val as Size)}
                    className="flex flex-wrap gap-2"
                  >
                    {product.variants.map((v) => (
                      <div key={v.size} className="flex items-center">
                        <RadioGroupItem
                          value={v.size}
                          id={`size-${v.size}`}
                          className="peer sr-only"
                          disabled={v.stock === 0}
                        />
                        <Label
                          htmlFor={`size-${v.size}`}
                          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-white text-sm font-bold ring-offset-background transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:bg-secondary peer-disabled:opacity-20 peer-disabled:cursor-not-allowed"
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
                className="w-full h-12 font-bold text-lg"
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
