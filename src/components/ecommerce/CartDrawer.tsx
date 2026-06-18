"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Trash2, Send, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const CartDrawer = ({ children }: { children: React.ReactNode }) => {
  const { cart, updateQuantity, removeFromCart, totalPrice, generateWhatsAppLink } = useCart();
  const [shippingMethod, setShippingMethod] = useState("DAC");

  const handleCheckout = () => {
    const link = generateWhatsAppLink(shippingMethod);
    window.open(link, '_blank');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l border-marifer-primary/10">
        <SheetHeader className="p-6 border-b border-marifer-primary/5">
          <SheetTitle className="font-headline text-2xl font-black text-marifer-dark">Tu Carrito</SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-6">
            <div className="w-24 h-24 bg-marifer-bg rounded-3xl flex items-center justify-center text-marifer-primary/20">
              <ShoppingBag className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <p className="text-marifer-dark font-bold text-xl">
                ¡Tu carrito está vacío!
              </p>
              <p className="text-marifer-dark/50 text-sm max-w-[240px]">
                Explorá nuestra tienda y encontrá las prendas que más te gusten.
              </p>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="py-6 space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden border border-marifer-primary/10 bg-marifer-bg shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm text-marifer-dark leading-tight line-clamp-1">{item.product.title}</h4>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs font-bold text-marifer-primary mt-1">Talle {item.chosenSize}</p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2 border border-marifer-primary/10 rounded-xl p-1 bg-marifer-bg">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 rounded-lg"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-5 text-center text-xs font-bold text-marifer-dark">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 rounded-lg"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="font-headline font-black text-marifer-dark">
                          ${(item.product.price * item.quantity).toLocaleString('es-UY')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-6 bg-marifer-bg space-y-6 border-t border-marifer-primary/5">
              <div className="space-y-4">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-marifer-dark/40">Opciones de Envío</Label>
                <RadioGroup 
                  defaultValue="DAC" 
                  onValueChange={setShippingMethod}
                  className="grid grid-cols-2 gap-3"
                >
                  <div className="relative">
                    <RadioGroupItem value="DAC" id="dac" className="peer sr-only" />
                    <Label
                      htmlFor="dac"
                      className="flex flex-col items-center justify-center rounded-2xl border-2 border-transparent bg-white p-4 hover:bg-white/80 peer-data-[state=checked]:border-marifer-primary peer-data-[state=checked]:bg-white transition-all cursor-pointer shadow-sm"
                    >
                      <span className="text-sm font-black text-marifer-dark">DAC</span>
                      <span className="text-[10px] text-marifer-dark/40 font-bold">Todo el país</span>
                    </Label>
                  </div>
                  <div className="relative">
                    <RadioGroupItem value="Mirtrans" id="mirtrans" className="peer sr-only" />
                    <Label
                      htmlFor="mirtrans"
                      className="flex flex-col items-center justify-center rounded-2xl border-2 border-transparent bg-white p-4 hover:bg-white/80 peer-data-[state=checked]:border-marifer-primary peer-data-[state=checked]:bg-white transition-all cursor-pointer shadow-sm"
                    >
                      <span className="text-sm font-black text-marifer-dark">Mirtrans</span>
                      <span className="text-[10px] text-marifer-dark/40 font-bold">Todo el país</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2 border-t border-marifer-primary/10 pt-4">
                <div className="flex justify-between text-sm font-bold text-marifer-dark/50">
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString('es-UY')}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-marifer-dark/50">
                  <span>Envío</span>
                  <span className="text-marifer-whatsapp">Costo en destino</span>
                </div>
                <Separator className="bg-marifer-primary/10 my-4" />
                <div className="flex justify-between text-2xl font-black font-headline text-marifer-dark">
                  <span>Total</span>
                  <span className="text-marifer-primary">${totalPrice.toLocaleString('es-UY')}</span>
                </div>
              </div>
            </div>

            <SheetFooter className="p-6 pt-2">
              <Button 
                className="w-full h-16 bg-marifer-whatsapp hover:bg-marifer-whatsapp/90 text-white font-black text-lg rounded-2xl flex gap-3 shadow-xl shadow-marifer-whatsapp/20 transition-all active:scale-95"
                onClick={handleCheckout}
              >
                <Send className="w-5 h-5 fill-current" />
                Comprar por WhatsApp
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
