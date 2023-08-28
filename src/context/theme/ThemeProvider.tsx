import React, {useState} from 'react';
import {ThemeContext} from './ThemeContext';
import {TThemeKey, themes} from '../../theme';
import {Appearance} from 'react-native';

type TThemeProvider = {
  children: React.ReactNode;
};

export const ThemeProvider = ({children}: TThemeProvider): JSX.Element => {
  const [themeKey, setThemeKey] = useState<TThemeKey>('dark');

  // Handle user state changes
  const handleChangeTheme = (newThemeKey: TThemeKey) => {
    setThemeKey(newThemeKey);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme:
          themes[
            themeKey === 'automatic'
              ? Appearance.getColorScheme() ?? 'dark'
              : themeKey
          ],
        themeKey,
        changeThemeKey: handleChangeTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
