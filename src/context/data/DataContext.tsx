import {createContext} from 'react';
import {TUseTagsResponse, TUseWordsResponse} from '../../hooks';

type ContextProps = {
  tags: TUseTagsResponse;
  words: TUseWordsResponse;
};

export const DataContext = createContext({} as ContextProps);
