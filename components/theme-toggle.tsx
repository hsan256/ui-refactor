"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-8 w-8 p-0 bg-white/80 backdrop-blur-sm border-white/20 hover:bg-white/90 dark:bg-gray-900/80 dark:border-gray-700/50 dark:hover:bg-gray-800/90"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 text-gray-700 dark:text-gray-200" />
      ) : (
        <Sun className="h-4 w-4 text-gray-700 dark:text-gray-200" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 