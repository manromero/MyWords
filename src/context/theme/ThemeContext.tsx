import {createContext} from 'react';
import {TThemeKey} from '../../theme';

type ContextProps = {
  theme: any;
  themeKey: TThemeKey;
  changeThemeKey: (theme: TThemeKey) => void;
};

export const ThemeContext = createContext({} as ContextProps);
