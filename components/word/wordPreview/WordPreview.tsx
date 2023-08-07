import React from 'react';

import {MWCard} from '../../commons';
import {WordPreviewContent} from './WordPreviewContent';

type TWordPreview = {
  word: string;
  translation?: string;
  notes?: string;
  learned?: boolean;
};

export const WordPreview = (props: TWordPreview): JSX.Element => {
  return (
    <MWCard>
      <WordPreviewContent {...props} />
    </MWCard>
  );
};
