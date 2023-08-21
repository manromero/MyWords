import {TTag} from './tag';

export type TWord = {
  id?: string;
  word?: string;
  translation?: string;
  notes?: string;
  learned?: boolean;
  tags?: TTag[];
};
