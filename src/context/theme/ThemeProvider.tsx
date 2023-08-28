import React, {useContext, useEffect, useState} from 'react';
import {ThemeContext} from './ThemeContext';
import {TThemeKey, themes} from '../../theme';
import {Appearance} from 'react-native';
import {DataContext} from '../data';

type TThemeProvider = {
  children: React.ReactNode;
};

export const ThemeProvider = ({children}: TThemeProvider): JSX.Element => {
  const {preferences} = useContext(DataContext);
  const [themeKey, setThemeKey] = useState<TThemeKey>(
    preferences.data.theme ?? 'automatic',
  );

  useEffect(() => {
    setThemeKey(preferences.data.theme ?? 'automatic');
  }, [preferences.data]);

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
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
