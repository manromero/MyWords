import React, {useEffect, useState} from 'react';
import {ThemeContext} from './ThemeContext';
import {TThemeKey, themes} from '../../theme';
import {Appearance} from 'react-native';
import {useData} from '../../hooks';

type TThemeProvider = {
  children: React.ReactNode;
};

export const ThemeProvider = ({children}: TThemeProvider): JSX.Element => {
  const {preferences} = useData();
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
