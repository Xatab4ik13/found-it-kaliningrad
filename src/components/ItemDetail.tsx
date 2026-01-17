import { FoundItem } from '@/types';
import { transportLabels } from '@/data/routes';
import { Button } from '@/components/ui/button';
import { MapPin, FileText, ArrowLeft } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

interface ItemDetailProps {
  item: FoundItem;
  onBack: () => void;
}

export const ItemDetail = ({ item, onBack }: ItemDetailProps) => {
  const dateFormatted = format(parseISO(item.date), 'd MMMM yyyy', { locale: ru });

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <button 
          onClick={onBack}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к списку
        </button>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="aspect-[16/10] max-h-48 overflow-hidden bg-muted mx-4 rounded-xl">
          <img 
            src={item.photo} 
            alt={item.description}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {item.description}
            </h2>
            <div className="flex flex-wrap gap-2">
              <span className="breadcrumb-chip">
                {transportLabels[item.transportType]}
              </span>
              <span className="breadcrumb-chip">
                № {item.routeNumber}
              </span>
              <span className="breadcrumb-chip">
                {dateFormatted}
              </span>
            </div>
          </div>
          
          <div className="bg-accent/50 rounded-xl p-4 space-y-3">
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Забрать можно по адресу:
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.pickupAddress}
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                При себе иметь документ, удостоверяющий личность.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-border bg-card">
        <Button 
          onClick={onBack}
          className="w-full"
          size="lg"
        >
          Понятно
        </Button>
      </div>
    </div>
  );
};
