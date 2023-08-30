// react
import React from 'react';

// context
import {DataContext} from './DataContext';

// hooks
import {usePreferences, useTags, useWords} from '../../hooks';

type TDataProvider = {
  children: React.ReactNode;
};

export const DataProvider = ({children}: TDataProvider): JSX.Element => {
  const tags = useTags();
  const words = useWords();
  const preferences = usePreferences();

  return (
    <DataContext.Provider value={{tags, words, preferences}}>
      {children}
    </DataContext.Provider>
  );
};
