import { FoundItem, TransportType } from '@/types';
import { parseISO, differenceInDays } from 'date-fns';

// Mock data для демонстрации
export const mockFoundItems: FoundItem[] = [
  {
    id: '1',
    photo: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    description: 'Чёрный кожаный кошелёк',
    date: '2026-01-17',
    routeNumber: '7',
    transportType: 'bus',
    pickupAddress: 'Калининград, ул. Киевская 17',
  },
  {
    id: '2',
    photo: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop',
    description: 'Солнцезащитные очки',
    date: '2026-01-17',
    routeNumber: '7',
    transportType: 'bus',
    pickupAddress: 'Калининград, ул. Киевская 17',
  },
  {
    id: '3',
    photo: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=300&fit=crop',
    description: 'Связка ключей с брелком',
    date: '2026-01-17',
    routeNumber: '1',
    transportType: 'trolleybus',
    pickupAddress: 'Калининград, ул. Киевская 17',
  },
  {
    id: '4',
    photo: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=400&h=300&fit=crop',
    description: 'Детский рюкзак синий',
    date: '2026-01-17',
    routeNumber: '3',
    transportType: 'tram',
    pickupAddress: 'Калининград, ул. Киевская 17',
  },
  {
    id: '5',
    photo: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    description: 'Наручные часы серебристые',
    date: '2026-01-16',
    routeNumber: '2А',
    transportType: 'bus',
    pickupAddress: 'Калининград, ул. Киевская 17',
  },
  {
    id: '6',
    photo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    description: 'Беспроводные наушники',
    date: '2026-01-17',
    routeNumber: '7',
    transportType: 'bus',
    pickupAddress: 'Калининград, ул. Киевская 17',
  },
  {
    id: '7',
    photo: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop',
    description: 'Книга в мягкой обложке',
    date: '2026-01-17',
    routeNumber: '7',
    transportType: 'bus',
    pickupAddress: 'Калининград, ул. Киевская 17',
  },
  {
    id: '8',
    photo: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=300&fit=crop',
    description: 'Сумка-шоппер бежевая',
    date: '2026-01-17',
    routeNumber: '1',
    transportType: 'bus',
    pickupAddress: 'Калининград, ул. Киевская 17',
  },
];

// Filter by transport type and date range (±3 days from selected date)
export const getFilteredItems = (
  transportType: TransportType,
  date: string
): FoundItem[] => {
  const selectedDate = parseISO(date);
  
  return mockFoundItems.filter(item => {
    if (item.transportType !== transportType) return false;
    
    const itemDate = parseISO(item.date);
    const daysDiff = Math.abs(differenceInDays(selectedDate, itemDate));
    
    return daysDiff <= 3;
  });
};
