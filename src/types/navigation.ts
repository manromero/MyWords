import {routes} from '../routes';
import {TTag} from './tag';
import {TWord} from './word';

export type TNavigatorTabParamList = {
  [routes.SCREEN_WORD_CAROUSEL]: undefined;
  [routes.SCREEN_WORD_CREATION]: undefined;
  [routes.SCREEN_SETTINGS]: undefined;
};

export type TNavigatorSettingsStackParamList = {
  [routes.SCREEN_SETTINGS]: undefined;
  [routes.SCREEN_WORD_LIST]: undefined;
  [routes.SCREEN_WORD_EDITION]: TWord;
  [routes.SCREEN_TAG_LIST]: undefined;
  [routes.SCREEN_TAG_CREATION]: undefined;
  [routes.SCREEN_TAG_EDITION]: TTag;
  [routes.SCREEN_PREFERENCES]: undefined;
};
