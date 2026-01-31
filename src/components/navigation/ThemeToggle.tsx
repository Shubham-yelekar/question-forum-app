"use client";

import { Switch } from "@/components/ui/switch";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { useThemeStore } from "@/stores/useThemeStore";

=======
=======
>>>>>>> Stashed changes
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
>>>>>>> Stashed changes

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center gap-2">
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      Dark Mode
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
      
=======
=======
>>>>>>> Stashed changes
      <Sun size={16} />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <Moon size={16} />
>>>>>>> Stashed changes
    </div>
  );
}
