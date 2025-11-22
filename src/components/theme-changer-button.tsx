'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function ThemeChangerButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    function hello() {
      setMounted(true);
      console.log('mounted');
    }
    hello();
  }, []);

  if (!mounted) {
    return null;
  }
  const isDark: boolean = theme === 'dark';

  return (
    <>
      <Button
        variant="ghost"
        size="icon-lg"
        onClick={() => {
          setTheme(isDark ? 'light' : 'dark');
          console.log(theme);
        }}
        className={cn(
          'w-8 h-8 border',
          isDark ? 'border-white' : 'border-black'
        )}>
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
    </>
  );
}

export { ThemeChangerButton };
