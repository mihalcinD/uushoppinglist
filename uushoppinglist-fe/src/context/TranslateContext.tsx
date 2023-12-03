import { createContext, useContext, useEffect, useMemo, JSX, useState } from 'react';

import { createTheme, responsiveFontSizes, ThemeProvider as MuiThemeProvider, useMediaQuery } from '@mui/material';

type Props = {
  children: JSX.Element | JSX.Element[];
};

type TranslateContextType = {
  mode: 'light' | 'dark';
  toggleMode: () => void;
};

export const useTranslateContext = () => {
  return useContext(TranslateContext);
};

export const TranslateContext = createContext<TranslateContextType>(undefined!);

export const TranslateProvider = ({ children }: Props) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  let theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode],
  );
  theme = responsiveFontSizes(theme);

  useEffect(() => {
    const mode = localStorage.getItem('mode');
    if (mode) {
      setMode(mode as 'light' | 'dark');
    } else {
      setMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, [prefersDarkMode]);
  const toggleMode = () => {
    const _mode = mode === 'light' ? 'dark' : 'light';
    setMode(_mode);
    localStorage.setItem('mode', _mode);
  };

  return (
    <TranslateContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </TranslateContext.Provider>
  );
};
