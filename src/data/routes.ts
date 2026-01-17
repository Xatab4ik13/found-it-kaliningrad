import { Route, TransportType } from '@/types';

export const routes: Route[] = [
  // Автобусы
  { id: 'bus-1', number: '1', transportType: 'bus' },
  { id: 'bus-2a', number: '2А', transportType: 'bus' },
  { id: 'bus-7', number: '7', transportType: 'bus' },
  { id: 'bus-11', number: '11', transportType: 'bus' },
  { id: 'bus-14', number: '14', transportType: 'bus' },
  { id: 'bus-15', number: '15', transportType: 'bus' },
  { id: 'bus-16', number: '16', transportType: 'bus' },
  { id: 'bus-18', number: '18', transportType: 'bus' },
  { id: 'bus-23', number: '23', transportType: 'bus' },
  { id: 'bus-27', number: '27', transportType: 'bus' },
  { id: 'bus-30', number: '30', transportType: 'bus' },
  { id: 'bus-31', number: '31', transportType: 'bus' },
  { id: 'bus-32', number: '32', transportType: 'bus' },
  { id: 'bus-34', number: '34', transportType: 'bus' },
  { id: 'bus-36', number: '36', transportType: 'bus' },
  { id: 'bus-37', number: '37', transportType: 'bus' },
  { id: 'bus-39', number: '39', transportType: 'bus' },
  
  // Троллейбусы
  { id: 'trolley-1', number: '1', transportType: 'trolleybus' },
  { id: 'trolley-2', number: '2', transportType: 'trolleybus' },
  { id: 'trolley-7', number: '7', transportType: 'trolleybus' },
  
  // Трамваи
  { id: 'tram-3', number: '3', transportType: 'tram' },
  { id: 'tram-5', number: '5', transportType: 'tram' },
];

export const getRoutesByTransport = (type: TransportType): Route[] => {
  return routes.filter(route => route.transportType === type);
};

export const transportLabels: Record<TransportType, string> = {
  bus: 'Автобус',
  trolleybus: 'Троллейбус',
  tram: 'Трамвай',
};
