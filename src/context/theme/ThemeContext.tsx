import {createContext} from 'react';
import {TThemeKey} from '../../theme';

type ContextProps = {
  theme: any;
  changeTheme: (theme: TThemeKey) => void;
};

export const ThemeContext = createContext({} as ContextProps);
