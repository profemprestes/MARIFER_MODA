
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
import { Plus, Minus, Trash2, Send } from 'lucide-react';
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
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="font-headline text-2xl font-bold">Tu Carrito</SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-primary">
              <Plus className="w-8 h-8 rotate-45" />
            </div>
            <p className="text-muted-foreground font-medium">
              ¡Tu carrito está vacío! <br /> Empezá a llenarlo con lo que más te guste.
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="py-6 space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden border bg-secondary shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-sm leading-tight line-clamp-1">{item.product.title}</h4>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">Talle: <span className="font-bold text-foreground">{item.chosenSize}</span></p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 border rounded-md p-1 bg-secondary/50">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-4 text-center text-xs font-bold">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="font-headline font-bold text-sm">
                          ${(item.product.price * item.quantity).toLocaleString('es-UY')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-6 bg-secondary/30 space-y-4">
              <div className="space-y-3">
                <Label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Método de Envío</Label>
                <RadioGroup 
                  defaultValue="DAC" 
                  onValueChange={setShippingMethod}
                  className="grid grid-cols-2 gap-3"
                >
                  <div>
                    <RadioGroupItem value="DAC" id="dac" className="peer sr-only" />
                    <Label
                      htmlFor="dac"
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-white p-3 hover:bg-secondary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all cursor-pointer"
                    >
                      <span className="text-sm font-bold">DAC</span>
                      <span className="text-[10px] text-muted-foreground">Envíos a todo el país</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="Mirtrans" id="mirtrans" className="peer sr-only" />
                    <Label
                      htmlFor="mirtrans"
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-white p-3 hover:bg-secondary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all cursor-pointer"
                    >
                      <span className="text-sm font-bold">Mirtrans</span>
                      <span className="text-[10px] text-muted-foreground">Envíos a todo el país</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString('es-UY')}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Envío</span>
                  <span className="text-success font-medium">A pagar en destino</span>
                </div>
                <div className="flex justify-between text-xl font-bold font-headline mt-2">
                  <span>Total</span>
                  <span className="text-primary">${totalPrice.toLocaleString('es-UY')}</span>
                </div>
              </div>
            </div>

            <SheetFooter className="p-6 pt-2">
              <Button 
                className="w-full h-14 bg-success hover:bg-success/90 text-white font-bold text-lg rounded-xl flex gap-3 shadow-lg shadow-success/20"
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
