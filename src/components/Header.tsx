import logo from '@/assets/gortrans-logo.png';

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-3">
      <div className="flex items-center gap-3">
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
    </header>
  );
};
