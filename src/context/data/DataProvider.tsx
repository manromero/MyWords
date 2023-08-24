import React from 'react';
import {DataContext} from './DataContext';

import {useTags, useWords} from '../../hooks';

type TDataProvider = {
  children: React.ReactNode;
};

export const DataProvider = ({children}: TDataProvider): JSX.Element => {
  const tags = useTags();
  const words = useWords();

  return (
    <DataContext.Provider value={{tags, words}}>
      {children}
    </DataContext.Provider>
  );
};
