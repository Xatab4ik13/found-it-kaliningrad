import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { transportLabels } from '@/data/routes';
import { fetchAllItems, deleteItem as apiDeleteItem } from '@/lib/api';
import { FoundItem } from '@/types';
import { Trash2, AlertCircle, Clock, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const AdminItemsList = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<FoundItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteItemState, setDeleteItemState] = useState<FoundItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await fetchAllItems();
      setItems(data);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить список находок',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async () => {
    if (!deleteItemState) return;
    
    setIsDeleting(true);

    try {
      await apiDeleteItem(deleteItemState.id);
      setItems(prev => prev.filter(item => item.id !== deleteItemState.id));
      
      toast({
        title: 'Находка удалена',
        description: 'Запись и фото успешно удалены',
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить находку',
        variant: 'destructive',
      });
    } finally {
      setDeleteItemState(null);
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 px-4">
        <RefreshCw className="w-8 h-8 text-muted-foreground animate-spin" />
        <p className="text-sm text-muted-foreground">Загрузка...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-muted-foreground" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="font-semibold text-foreground">Нет находок</h3>
          <p className="text-sm text-muted-foreground">
            Опубликованные находки появятся здесь
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Опубликованные находки
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={loadItems}>
            <RefreshCw className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {items.length} шт.
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 text-xs text-muted-foreground">
        <Clock className="w-4 h-4 flex-shrink-0" />
        <span>Находки автоматически удаляются через 3 месяца после публикации</span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 p-3 bg-card rounded-lg border border-border"
          >
            <img
              src={item.photo}
              alt={item.description}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  {transportLabels[item.transportType]} №{item.routeNumber}
                </span>
                <span>{format(new Date(item.date), 'd MMM yyyy', { locale: ru })}</span>
              </div>
              <p className="text-sm text-foreground line-clamp-2">
                {item.description}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDeleteItemState(item)}
              className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <AlertDialog open={!!deleteItemState} onOpenChange={() => setDeleteItemState(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить находку?</AlertDialogTitle>
            <AlertDialogDescription>
              Запись и фото будут удалены безвозвратно. Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Удаление...' : 'Удалить'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
