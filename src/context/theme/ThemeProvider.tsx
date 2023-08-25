import React, {useState} from 'react';
import {ThemeContext} from './ThemeContext';
import {TThemeKey, themes} from '../../theme';

type TThemeProvider = {
  children: React.ReactNode;
};

export const ThemeProvider = ({children}: TThemeProvider): JSX.Element => {
  const [theme, setTheme] = useState<TThemeKey>('dark');

  // Handle user state changes
  const handleChangeTheme = (newTheme: TThemeKey) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: themes[theme],
        changeTheme: handleChangeTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
