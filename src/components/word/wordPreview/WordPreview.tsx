import React from 'react';

import {MWCard} from '../../commons';
import {WordPreviewContent} from './WordPreviewContent';

// types
import {TWord} from '../../../types';

type TWordPreview = TWord;

export const WordPreview = (props: TWordPreview): JSX.Element => {
  return (
    <MWCard>
      <WordPreviewContent {...props} />
    </MWCard>
  );
};
