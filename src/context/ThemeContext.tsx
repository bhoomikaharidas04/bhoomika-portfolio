import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'pastel' | 'terminal-dark';

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bh_os_theme') as ThemeMode;
      if (saved === 'terminal-dark' || saved === 'pastel') return saved;
    }
    return 'pastel';
  });

  const isDark = theme === 'terminal-dark';

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('theme-dark');
      root.classList.remove('theme-pastel');
    } else {
      root.classList.remove('theme-dark');
      root.classList.add('theme-pastel');
    }
    localStorage.setItem('bh_os_theme', theme);
  }, [theme, isDark]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'pastel' ? 'terminal-dark' : 'pastel'));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
