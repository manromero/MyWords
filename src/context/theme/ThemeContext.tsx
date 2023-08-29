import {createContext} from 'react';
import {TTheme, TThemeKey} from '../../theme';

type ContextProps = {
  theme: TTheme;
  themeKey: TThemeKey;
};

export const ThemeContext = createContext({} as ContextProps);
