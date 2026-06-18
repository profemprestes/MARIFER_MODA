
import type {Metadata} from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'MARIFER MODA | E-commerce Uruguay',
  description: 'Descubre la mejor moda en MARIFER MODA. Pantalones, buzos, remeras y más. Envíos a todo Uruguay.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body 
        className="font-body antialiased bg-background selection:bg-primary/20 selection:text-primary"
        suppressHydrationWarning
      >
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
