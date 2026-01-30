"use client";

import { Switch } from "@/components/ui/switch";
import { useThemeStore } from "@/stores/useThemeStore";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="flex items-center gap-2">
      <Sun size={16} />
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      <Moon size={16} />
    </div>
  );
}
