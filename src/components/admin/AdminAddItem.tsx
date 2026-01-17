import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { TransportType } from '@/types';
import { transportLabels } from '@/data/routes';
import { routes as allRoutes } from '@/data/routes';
import { Bus, Zap, TrainFront, Upload, X, CheckCircle, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

interface AdminAddItemProps {
  onSuccess: () => void;
}

const transportConfig: Record<'bus' | 'trolleybus' | 'tram', { 
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

const availableTransports: ('bus' | 'trolleybus' | 'tram')[] = ['bus', 'trolleybus', 'tram'];

export const AdminAddItem = ({ onSuccess }: AdminAddItemProps) => {
  const { toast } = useToast();
  const [transportType, setTransportType] = useState<'bus' | 'trolleybus' | 'tram' | null>(null);
  const [routeNumber, setRouteNumber] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const routes = transportType 
    ? allRoutes.filter(r => r.transportType === transportType)
    : [];

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
  };

  const isValid = transportType && routeNumber && date && description.trim() && photo;

  const handleSubmit = async () => {
    if (!isValid) return;
    
    setIsSubmitting(true);

    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: 'Находка опубликована',
      description: 'Запись успешно добавлена в систему',
    });

    // Reset form
    setTransportType(null);
    setRouteNumber(null);
    setDate(undefined);
    setDescription('');
    setPhoto(null);
    setPhotoPreview(null);
    setIsSubmitting(false);
    
    onSuccess();
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <h2 className="text-lg font-semibold text-foreground">
        Добавить находку
      </h2>

      {/* Transport Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Транспорт</label>
        <div className="grid grid-cols-3 gap-2">
          {availableTransports.map((type) => {
            const config = transportConfig[type];
            const Icon = config.icon;
            const isSelected = transportType === type;
            
            return (
              <button
                key={type}
                onClick={() => {
                  setTransportType(type);
                  setRouteNumber(null);
                }}
                className={cn(
                  'flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all',
                  isSelected 
                    ? 'border-primary bg-accent' 
                    : 'border-border bg-card hover:border-primary/50'
                )}
              >
                <Icon className={cn('w-5 h-5', config.colorClass)} />
                <span className="text-xs font-medium">{transportLabels[type]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Route Selection */}
      {transportType && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Маршрут</label>
          <div className="flex flex-wrap gap-2">
            {routes.map((route) => (
              <button
                key={route.id}
                onClick={() => setRouteNumber(route.number)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                  routeNumber === route.number
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
              >
                {route.number}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Date Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Дата находки</label>
        <div className="border border-border rounded-lg overflow-hidden bg-card">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => date > new Date()}
            locale={ru}
            className="w-full"
          />
        </div>
        {date && (
          <p className="text-sm text-muted-foreground">
            Выбрано: {format(date, 'd MMMM yyyy', { locale: ru })}
          </p>
        )}
      </div>

      {/* Photo Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Фото</label>
        {photoPreview ? (
          <div className="relative">
            <img 
              src={photoPreview} 
              alt="Preview" 
              className="w-full h-48 object-cover rounded-lg border border-border"
            />
            <button
              onClick={removePhoto}
              className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center gap-3 h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-card">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">Нажмите для загрузки фото</span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Описание</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Опишите найденную вещь..."
          className="min-h-[100px] resize-none"
        />
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={!isValid || isSubmitting}
        className="w-full gap-2"
        size="lg"
      >
        {isSubmitting ? (
          'Публикация...'
        ) : (
          <>
            <Upload className="w-4 h-4" />
            Опубликовать
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Находки автоматически удаляются через 3 месяца
      </p>
    </div>
  );
};
