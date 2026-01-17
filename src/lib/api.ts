import { FoundItem, TransportType } from '@/types';

const API_URL = 'http://109.73.195.164:3001';

// Преобразование данных с сервера в формат фронтенда
const mapServerItem = (item: any): FoundItem => ({
  id: String(item.id),
  photo: `${API_URL}/photos/${item.photo}`,
  description: item.description,
  date: item.date,
  routeNumber: item.routeNumber,
  transportType: item.transportType as TransportType,
  pickupAddress: item.pickupAddress,
});

// Получить находки с фильтрацией
export const fetchItems = async (
  transportType?: TransportType,
  date?: string
): Promise<FoundItem[]> => {
  const params = new URLSearchParams();
  if (transportType) params.append('transportType', transportType);
  if (date) params.append('date', date);
  
  const response = await fetch(`${API_URL}/api/items?${params}`);
  if (!response.ok) throw new Error('Ошибка загрузки');
  
  const data = await response.json();
  return data.map(mapServerItem);
};

// Получить все находки (для админки)
export const fetchAllItems = async (): Promise<FoundItem[]> => {
  const response = await fetch(`${API_URL}/api/items`);
  if (!response.ok) throw new Error('Ошибка загрузки');
  
  const data = await response.json();
  return data.map(mapServerItem);
};

// Добавить находку
export const addItem = async (formData: FormData): Promise<{ success: boolean; id: number }> => {
  const response = await fetch(`${API_URL}/api/items`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Ошибка добавления');
  }
  
  return response.json();
};

// Удалить находку
export const deleteItem = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/items/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Ошибка удаления');
  }
};
