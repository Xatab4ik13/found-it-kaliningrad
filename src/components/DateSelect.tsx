import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { TransportType } from '@/types';
import { transportLabels } from '@/data/routes';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface DateSelectProps {
  transportType: TransportType;
  routeNumber: string;
  onSelect: (date: Date) => void;
  onBack: () => void;
}

export const DateSelect = ({ 
  transportType, 
  routeNumber, 
  onSelect, 
  onBack 
}: DateSelectProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSubmit = () => {
    if (date) {
      onSelect(date);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 space-y-3">
        <button 
          onClick={onBack}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          ← Маршрут № {routeNumber}
        </button>
        
        <h2 className="text-lg font-semibold text-foreground">
          Выберите дату
        </h2>
        
        <div className="flex gap-2">
          <span className="breadcrumb-chip">
            {transportLabels[transportType]}
          </span>
          <span className="breadcrumb-chip">
            № {routeNumber}
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto px-4">
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={ru}
            disabled={{ after: new Date() }}
            className="rounded-lg border border-border bg-card p-3"
          />
        </div>
      </div>
      
      <div className="p-4 border-t border-border bg-card">
        <Button 
          onClick={handleSubmit}
          disabled={!date}
          className="w-full"
          size="lg"
        >
          {date 
            ? `Показать вещи за ${format(date, 'd MMMM', { locale: ru })}`
            : 'Выберите дату'
          }
        </Button>
      </div>
    </div>
  );
};
