// react
import {useContext} from 'react';

// context
import {ThemeContext} from '../context';

export const useTheme = () => {
  return useContext(ThemeContext);
};
