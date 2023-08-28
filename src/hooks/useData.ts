// react
import {useContext} from 'react';

// context
import {DataContext} from '../context';

export const useData = () => {
  return useContext(DataContext);
};
