import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { TransportSelect } from '@/components/TransportSelect';
import { RouteSelect } from '@/components/RouteSelect';
import { DateSelect } from '@/components/DateSelect';
import { ItemsGrid } from '@/components/ItemsGrid';
import { ItemDetail } from '@/components/ItemDetail';
import { TransportType, Route, FoundItem, SearchState } from '@/types';
import { transportLabels } from '@/data/routes';
import { AlertCircle, ArrowLeft } from 'lucide-react';

type Screen = 'transport' | 'route' | 'date' | 'items' | 'detail' | 'unavailable';

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

  const handleUnavailableTransport = (type: TransportType) => {
    setSearchState(prev => ({ ...prev, transportType: type }));
    setScreen('unavailable');
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
            onUnavailable={handleUnavailableTransport}
          />
        )}

        {screen === 'unavailable' && searchState.transportType && (
          <div className="flex flex-col gap-4 p-4">
            <button
              onClick={goToTransport}
              className="flex items-center gap-2 text-primary text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад
            </button>
            
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {transportLabels[searchState.transportType]}
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Данный вид транспорта не обслуживается нашим предприятием
                </p>
              </div>
              <button
                onClick={goToTransport}
                className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
              >
                Выбрать другой транспорт
              </button>
            </div>
          </div>
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
