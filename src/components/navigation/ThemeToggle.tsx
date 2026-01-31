"use client";

import { Switch } from "@/components/ui/switch";
import { useThemeStore } from "@/stores/useThemeStore";


export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="flex items-center gap-2">
      Dark Mode
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      
    </div>
  );
}
