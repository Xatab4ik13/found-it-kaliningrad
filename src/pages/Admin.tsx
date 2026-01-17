import { useState } from 'react';
import { Header } from '@/components/Header';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminAddItem } from '@/components/admin/AdminAddItem';
import { AdminItemsList } from '@/components/admin/AdminItemsList';
import { Button } from '@/components/ui/button';
import { Plus, List, LogOut } from 'lucide-react';

type AdminScreen = 'login' | 'add' | 'list';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [screen, setScreen] = useState<AdminScreen>('login');

  const handleLogin = () => {
    setIsAuthenticated(true);
    setScreen('add');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setScreen('login');
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-0 h-full bg-background">
        <Header showAdminButton={false} />
        <main className="flex-1 overflow-y-auto">
          <AdminLogin onLogin={handleLogin} />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-0 h-full bg-background">
      <Header showAdminButton={false} />
      
      <div className="flex items-center justify-between gap-2 p-4 border-b border-border bg-card">
        <div className="flex gap-2">
          <Button
            variant={screen === 'add' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setScreen('add')}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Добавить
          </Button>
          <Button
            variant={screen === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setScreen('list')}
            className="gap-2"
          >
            <List className="w-4 h-4" />
            Список
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="gap-2 text-muted-foreground"
        >
          <LogOut className="w-4 h-4" />
          Выйти
        </Button>
      </div>

      <main className="flex-1 overflow-y-auto">
        {screen === 'add' && <AdminAddItem onSuccess={() => setScreen('list')} />}
        {screen === 'list' && <AdminItemsList />}
      </main>
    </div>
  );
};

export default Admin;
