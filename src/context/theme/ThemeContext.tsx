import {createContext} from 'react';
import {TThemeKey} from '../../theme';

type ContextProps = {
  theme: any;
  themeKey: TThemeKey;
};

export const ThemeContext = createContext({} as ContextProps);
