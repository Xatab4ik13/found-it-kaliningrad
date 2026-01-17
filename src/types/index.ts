export type TransportType = 'bus' | 'trolleybus' | 'tram' | 'airplane' | 'train';

export interface Route {
  id: string;
  number: string;
  transportType: TransportType;
}

export interface FoundItem {
  id: string;
  photo: string;
  description: string;
  date: string;
  routeNumber: string;
  transportType: TransportType;
  pickupAddress: string;
}

export interface SearchState {
  transportType: TransportType | null;
  routeId: string | null;
  routeNumber: string | null;
  date: Date | null;
}
