// react
import {createContext} from 'react';

// types
import {
  TUsePreferencesResponse,
  TUseTagsResponse,
  TUseWordsResponse,
} from '../../hooks';

type ContextProps = {
  tags: TUseTagsResponse;
  words: TUseWordsResponse;
  preferences: TUsePreferencesResponse;
};

export const DataContext = createContext({} as ContextProps);
