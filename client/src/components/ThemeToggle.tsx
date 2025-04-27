import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure we're only rendering this component client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="h-9 w-9 rounded-full text-white hover:bg-[#002a77]"
    >
      <Sun className={`h-5 w-5 ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-500'}`} />
    </Button>
  );
}