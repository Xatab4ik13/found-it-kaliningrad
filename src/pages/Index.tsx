import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { TransportSelect } from '@/components/TransportSelect';
import { RouteSelect } from '@/components/RouteSelect';
import { DateSelect } from '@/components/DateSelect';
import { ItemsGrid } from '@/components/ItemsGrid';
import { ItemDetail } from '@/components/ItemDetail';
import { TransportType, Route, FoundItem, SearchState } from '@/types';

type Screen = 'transport' | 'route' | 'date' | 'items' | 'detail';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('transport');
  const [searchState, setSearchState] = useState<SearchState>({
    transportType: null,
    routeId: null,
    routeNumber: null,
    date: null,
  });
  const [selectedItem, setSelectedItem] = useState<FoundItem | null>(null);

  // Initialize Telegram theme colors if available
  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      // Set theme based on Telegram params
      const colorScheme = tg.colorScheme;
      if (colorScheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Ready signal to Telegram - NO expand!
      tg.ready?.();
    }
  }, []);

  const handleTransportSelect = (type: TransportType) => {
    setSearchState(prev => ({ ...prev, transportType: type }));
    setScreen('route');
  };

  const handleRouteSelect = (route: Route) => {
    setSearchState(prev => ({ 
      ...prev, 
      routeId: route.id, 
      routeNumber: route.number 
    }));
    setScreen('date');
  };

  const handleDateSelect = (date: Date) => {
    setSearchState(prev => ({ ...prev, date }));
    setScreen('items');
  };

  const handleItemSelect = (item: FoundItem) => {
    setSelectedItem(item);
    setScreen('detail');
  };

  const goToTransport = () => {
    setSearchState({
      transportType: null,
      routeId: null,
      routeNumber: null,
      date: null,
    });
    setScreen('transport');
  };

  const goToRoute = () => {
    setSearchState(prev => ({ 
      ...prev, 
      routeId: null, 
      routeNumber: null,
      date: null 
    }));
    setScreen('route');
  };

  const goToDate = () => {
    setSearchState(prev => ({ ...prev, date: null }));
    setScreen('date');
  };

  const goToItems = () => {
    setSelectedItem(null);
    setScreen('items');
  };

  return (
    <div className="flex flex-col min-h-screen max-h-screen bg-background">
      <Header />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {screen === 'transport' && (
          <TransportSelect
            selected={searchState.transportType}
            onSelect={handleTransportSelect}
          />
        )}

        {screen === 'route' && searchState.transportType && (
          <RouteSelect
            transportType={searchState.transportType}
            onSelect={handleRouteSelect}
            onBack={goToTransport}
          />
        )}

        {screen === 'date' && searchState.transportType && searchState.routeNumber && (
          <DateSelect
            transportType={searchState.transportType}
            routeNumber={searchState.routeNumber}
            onSelect={handleDateSelect}
            onBack={goToRoute}
          />
        )}

        {screen === 'items' && searchState.transportType && searchState.routeNumber && searchState.date && (
          <ItemsGrid
            transportType={searchState.transportType}
            routeNumber={searchState.routeNumber}
            date={searchState.date}
            onSelectItem={handleItemSelect}
            onBack={goToDate}
          />
        )}

        {screen === 'detail' && selectedItem && (
          <ItemDetail
            item={selectedItem}
            onBack={goToItems}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
