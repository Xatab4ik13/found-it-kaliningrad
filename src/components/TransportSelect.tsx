import { Bus, Zap, TrainFront, Plane, Train } from 'lucide-react';
import { TransportType } from '@/types';
import { transportLabels, unavailableTransports } from '@/data/routes';
import { cn } from '@/lib/utils';

interface TransportSelectProps {
  selected: TransportType | null;
  onSelect: (type: TransportType) => void;
  onUnavailable: (type: TransportType) => void;
}

const transportConfig: Record<TransportType, { 
  icon: React.ElementType; 
  colorClass: string;
  bgClass: string;
}> = {
  bus: { 
    icon: Bus, 
    colorClass: 'text-primary',
    bgClass: 'bg-primary/10',
  },
  trolleybus: { 
    icon: Zap, 
    colorClass: 'text-emerald-600 dark:text-emerald-400',
    bgClass: 'bg-emerald-500/10',
  },
  tram: { 
    icon: TrainFront, 
    colorClass: 'text-amber-600 dark:text-amber-400',
    bgClass: 'bg-amber-500/10',
  },
  airplane: { 
    icon: Plane, 
    colorClass: 'text-muted-foreground',
    bgClass: 'bg-muted',
  },
  train: { 
    icon: Train, 
    colorClass: 'text-muted-foreground',
    bgClass: 'bg-muted',
  },
};

const transportOrder: TransportType[] = ['bus', 'trolleybus', 'tram', 'airplane', 'train'];

export const TransportSelect = ({ selected, onSelect, onUnavailable }: TransportSelectProps) => {
  const handleSelect = (type: TransportType) => {
    if (unavailableTransports.includes(type)) {
      onUnavailable(type);
    } else {
      onSelect(type);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-lg font-semibold text-foreground">
        Выберите транспорт
      </h2>
      
      <div className="grid grid-cols-3 gap-3">
        {transportOrder.map((type) => {
          const config = transportConfig[type];
          const Icon = config.icon;
          const isSelected = selected === type;
          const isUnavailable = unavailableTransports.includes(type);
          
          return (
            <button
              key={type}
              onClick={() => handleSelect(type)}
              className={cn(
                'transport-btn',
                isSelected && 'transport-btn-active',
                isUnavailable && 'opacity-60'
              )}
            >
              <div className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center',
                config.bgClass
              )}>
                <Icon className={cn('w-6 h-6', config.colorClass)} />
              </div>
              <span className="text-sm font-medium text-foreground">
                {transportLabels[type]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
