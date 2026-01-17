import { useNavigate, useLocation } from 'react-router-dom';
import logo from '@/assets/gortrans-logo.png';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  showAdminButton?: boolean;
}

export const Header = ({ showAdminButton = true }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <img 
            src={logo} 
            alt="ГорТранс Калининград" 
            className="h-10 w-10 object-contain"
          />
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold text-foreground leading-tight">
              Бюро находок
            </h1>
            <span className="text-xs text-muted-foreground">
              Калининград-ГорТранс
            </span>
          </div>
        </div>

        {showAdminButton && !isAdminPage && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/admin')}
            className="text-muted-foreground hover:text-foreground"
            title="Админ-панель"
          >
            <Settings className="w-5 h-5" />
          </Button>
        )}
      </div>
    </header>
  );
};
