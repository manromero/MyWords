// react
import React from 'react';

// inner components
import {MWCard} from '../../commons';
import {WordPreviewContent} from './WordPreviewContent';

// types
import {TTag, TWord} from '../../../types';

type TWordPreview = Omit<TWord, 'tags'> & {tags: TTag[]};

export const WordPreview = (props: TWordPreview): JSX.Element => {
  return (
    <MWCard>
      <WordPreviewContent {...props} />
    </MWCard>
  );
};
