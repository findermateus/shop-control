'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'
import { Button } from '@/components/ui/button'

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      size="icon"
      aria-label="Alternar tema"
    >
      {theme === 'light' ? (
        <Moon className="h-6 w-6" />
      ) : (
        <Sun className="h-6 w-6" />
      )}
    </Button>
  )
}

