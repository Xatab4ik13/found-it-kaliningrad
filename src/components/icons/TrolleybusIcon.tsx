import { cn } from '@/lib/utils';

interface TrolleybusIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const TrolleybusIcon = ({ className, ...props }: TrolleybusIconProps) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn('w-6 h-6', className)} 
    {...props}
  >
    {/* Штанги токоприёмника */}
    <line x1="8" y1="1" x2="8" y2="5" />
    <line x1="16" y1="1" x2="16" y2="5" />
    
    {/* Корпус троллейбуса */}
    <rect x="3" y="5" width="18" height="13" rx="2" />
    
    {/* Окна */}
    <rect x="5" y="8" width="4" height="4" rx="0.5" />
    <rect x="15" y="8" width="4" height="4" rx="0.5" />
    
    {/* Дверь */}
    <rect x="10" y="8" width="4" height="6" rx="0.5" />
    
    {/* Колёса */}
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);
