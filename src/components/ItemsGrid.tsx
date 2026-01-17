import { useState, useEffect } from 'react';
import { TransportType, FoundItem } from '@/types';
import { transportLabels } from '@/data/routes';
import { getFilteredItems } from '@/data/mockItems';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface ItemsGridProps {
  transportType: TransportType;
  routeNumber: string;
  date: Date;
  onSelectItem: (item: FoundItem) => void;
  onBack: () => void;
}

const ItemSkeleton = () => (
  <div className="item-card">
    <div className="aspect-[4/3] skeleton-shimmer" />
    <div className="p-3 space-y-2">
      <div className="h-4 skeleton-shimmer w-3/4" />
      <div className="h-3 skeleton-shimmer w-1/2" />
    </div>
  </div>
);

export const ItemsGrid = ({ 
  transportType, 
  routeNumber, 
  date, 
  onSelectItem,
  onBack 
}: ItemsGridProps) => {
  const [items, setItems] = useState<FoundItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Симуляция загрузки с сервера
    const timer = setTimeout(() => {
      const dateStr = format(date, 'yyyy-MM-dd');
      // Route is ignored - filter by transport + date only
      const filtered = getFilteredItems(transportType, dateStr);
      setItems(filtered);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [transportType, date]);

  const dateFormatted = format(date, 'd MMMM yyyy', { locale: ru });

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 space-y-3">
        <button 
          onClick={onBack}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          ← Изменить дату
        </button>
        
        <h2 className="text-lg font-semibold text-foreground">
          Найденные вещи
        </h2>
        
        <div className="flex flex-wrap gap-2">
          <span className="breadcrumb-chip">
            {transportLabels[transportType]}
          </span>
          <span className="breadcrumb-chip">
            № {routeNumber}
          </span>
          <span className="breadcrumb-chip">
            {dateFormatted}
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto px-4 pb-4">
        {loading ? (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-36">
                <div className="aspect-square skeleton-shimmer rounded-lg" />
                <div className="mt-2 space-y-1">
                  <div className="h-3 skeleton-shimmer w-3/4" />
                  <div className="h-2 skeleton-shimmer w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-muted-foreground">
              На эту дату вещей нет
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Попробуйте выбрать другую дату
            </p>
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="flex-shrink-0 w-36 item-card text-left"
              >
                <div className="aspect-square overflow-hidden bg-muted rounded-lg">
                  <img 
                    src={item.photo} 
                    alt={item.description}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
                <div className="p-2 space-y-0.5">
                  <p className="text-xs font-medium text-foreground line-clamp-2">
                    {item.description}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {transportLabels[item.transportType]} № {item.routeNumber}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
        
        <div className="mt-6 p-4 bg-muted/50 rounded-xl">
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            Если забытая вещь отсутствует — значит в бюро забытых вещей не поступала
          </p>
        </div>
      </div>
    </div>
  );
};
