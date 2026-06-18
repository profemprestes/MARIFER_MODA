
export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductVariant {
  size: Size;
  stock: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  variants: ProductVariant[];
}

export interface CartItem {
  id: string; // Composite ID: product.id + chosenSize
  product: Product;
  chosenSize: Size;
  quantity: number;
}

export type Category = 'Todos' | 'Pantalones' | 'Buzos Oversize' | 'Remeras' | 'Pijamas Polar Soft';
