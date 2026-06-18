
import { Product } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Pantalón Lino Crema',
    description: 'Pantalón de lino premium con corte relajado y cintura elástica. Ideal para media estación.',
    price: 1890,
    originalPrice: 2200,
    category: 'Pantalones',
    images: ['https://picsum.photos/seed/10/600/800'],
    variants: [
      { size: 'S', stock: 5 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 2 }
    ]
  },
  {
    id: '2',
    title: 'Buzo Oversize Orchid',
    description: 'Buzo de frisa soft con bordado central. Comodidad y estilo en una sola prenda.',
    price: 2450,
    category: 'Buzos Oversize',
    images: ['https://picsum.photos/seed/22/600/800'],
    variants: [
      { size: 'M', stock: 15 },
      { size: 'L', stock: 8 },
      { size: 'XL', stock: 5 }
    ]
  },
  {
    id: '3',
    title: 'Remera Basic Cotton',
    description: 'Remera 100% algodón peinado. El básico que no te puede faltar.',
    price: 890,
    originalPrice: 1100,
    category: 'Remeras',
    images: ['https://picsum.photos/seed/33/600/800'],
    variants: [
      { size: 'S', stock: 20 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 20 }
    ]
  },
  {
    id: '4',
    title: 'Pijama Polar Soft Oso',
    description: 'Conjunto de pijama ultra suave. Perfecto para los días más fríos.',
    price: 1590,
    category: 'Pijamas Polar Soft',
    images: ['https://picsum.photos/seed/44/600/800'],
    variants: [
      { size: 'S', stock: 3 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 5 }
    ]
  },
  {
    id: '5',
    title: 'Jogger Street Black',
    description: 'Jogger de algodón con puños reforzados. Calce perfecto.',
    price: 1650,
    originalPrice: 1950,
    category: 'Pantalones',
    images: ['https://picsum.photos/seed/15/600/800'],
    variants: [
      { size: 'M', stock: 12 },
      { size: 'L', stock: 10 },
      { size: 'XL', stock: 8 },
      { size: 'XXL', stock: 4 }
    ]
  },
  {
    id: '6',
    title: 'Buzo Soft Lavender',
    description: 'Buzo de lana sintética extremadamente suave al tacto.',
    price: 2100,
    category: 'Buzos Oversize',
    images: ['https://picsum.photos/seed/28/600/800'],
    variants: [
      { size: 'S', stock: 5 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 2 }
    ]
  }
];
