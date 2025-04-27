import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface BackButtonProps {
  className?: string;
}

export default function BackButton({ className }: BackButtonProps) {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={handleBack} 
      className={`flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 ${className || ''}`}
    >
      <ArrowLeft className="mr-1 h-4 w-4" />
      Back
    </Button>
  );
}