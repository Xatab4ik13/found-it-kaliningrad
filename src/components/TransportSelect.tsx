import { Bus, Zap, TrainFront } from 'lucide-react';
import { TransportType } from '@/types';
import { transportLabels } from '@/data/routes';
import { cn } from '@/lib/utils';

interface TransportSelectProps {
  selected: TransportType | null;
  onSelect: (type: TransportType) => void;
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
};

export const TransportSelect = ({ selected, onSelect }: TransportSelectProps) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-lg font-semibold text-foreground">
        Выберите транспорт
      </h2>
      
      <div className="grid grid-cols-3 gap-3">
        {(Object.keys(transportConfig) as TransportType[]).map((type) => {
          const config = transportConfig[type];
          const Icon = config.icon;
          const isSelected = selected === type;
          
          return (
            <button
              key={type}
              onClick={() => onSelect(type)}
              className={cn(
                'transport-btn',
                isSelected && 'transport-btn-active'
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
