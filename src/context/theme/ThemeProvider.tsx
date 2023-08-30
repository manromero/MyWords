// react
import React, {useEffect, useState} from 'react';

// context
import {ThemeContext} from './ThemeContext';

// theme
import {themes} from '../../theme';

// react-native
import {Appearance} from 'react-native';

// hooks
import {useData} from '../../hooks';

// types
import {TThemeKey} from '../../types';

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
