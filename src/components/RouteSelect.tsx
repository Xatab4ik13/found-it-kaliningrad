import { useState, useMemo } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { TransportType, Route } from '@/types';
import { getRoutesByTransport, transportLabels } from '@/data/routes';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface RouteSelectProps {
  transportType: TransportType;
  onSelect: (route: Route) => void;
  onBack: () => void;
}

export const RouteSelect = ({ transportType, onSelect, onBack }: RouteSelectProps) => {
  const [search, setSearch] = useState('');
  
  const routes = useMemo(() => {
    return getRoutesByTransport(transportType);
  }, [transportType]);
  
  const filteredRoutes = useMemo(() => {
    if (!search.trim()) return routes;
    return routes.filter(r => 
      r.number.toLowerCase().includes(search.toLowerCase())
    );
  }, [routes, search]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 space-y-3">
        <button 
          onClick={onBack}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          ← {transportLabels[transportType]}
        </button>
        
        <h2 className="text-lg font-semibold text-foreground">
          Выберите маршрут
        </h2>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по номеру..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto px-4 pb-4">
        <div className="space-y-2">
          {filteredRoutes.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Маршрут не найден
            </p>
          ) : (
            filteredRoutes.map((route) => (
              <button
                key={route.id}
                onClick={() => onSelect(route)}
                className="route-item w-full text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">
                    {route.number}
                  </span>
                </div>
                <span className="flex-1 text-foreground font-medium">
                  Маршрут № {route.number}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
