import { NavItem } from '@/app/types/userNavbarTypes';

export const Navigation: NavItem[] = [
  {
    name: 'New Products',
    children: [
      { name: 'Latest Arrivals', href: '#' },
      { name: 'Best Sellers', href: '#' },
      { name: 'On Sale', href: '#' },
    ],
  },
  {
    name: 'Instruments',
    children: [
      { name: 'Guitars', href: '#' },
      { name: 'Keyboards', href: '#' },
      { name: 'Drums', href: '#' },
    ],
  },
  {
    name: 'Gears',
    children: [
      { name: 'Amplifiers', href: '#' },
      { name: 'Pedals', href: '#' },
      { name: 'Cables', href: '#' },
    ],
  },
  {
    name: 'Brands',
    children: [
      { name: 'Fender', href: '#' },
      { name: 'Yamaha', href: '#' },
      { name: 'Roland', href: '#' },
    ],
  },
  {
    name: 'Informations',
    children: [
      { name: 'About Us', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'FAQ', href: '#' },
    ],
  },
];