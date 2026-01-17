import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, ArrowLeft, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminLoginProps {
  onLogin: () => void;
}

// TODO: In production, this should be validated against server
const ADMIN_PASSWORD = 'admin2024';

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate server validation delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // TODO: Replace with actual server validation
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Неверный пароль');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-primary text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        На главную
      </button>

      <div className="flex flex-col items-center justify-center gap-6 py-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Lock className="w-8 h-8 text-primary" />
        </div>
        
        <div className="text-center space-y-1">
          <h2 className="text-xl font-semibold text-foreground">
            Панель администратора
          </h2>
          <p className="text-sm text-muted-foreground">
            Введите пароль для входа
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-center"
              autoFocus
            />
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm justify-center">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={!password || isLoading}
          >
            {isLoading ? 'Проверка...' : 'Войти'}
          </Button>
        </form>
      </div>
    </div>
  );
};
