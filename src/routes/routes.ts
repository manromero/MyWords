const SCREEN_WORD_CAROUSEL = 'SCREEN_WORD_CAROUSEL';
const SCREEN_WORD_CREATION = 'SCREEN_WORD_CREATION';
const SCREEN_SETTINGS = 'SCREEN_SETTINGS';
const SCREEN_WORD_LIST = 'SCREEN_WORD_LIST';
const SCREEN_WORD_EDITION = 'SCREEN_WORD_EDITION';
const SCREEN_TAG_LIST = 'SCREEN_TAG_LIST';
const SCREEN_TAG_CREATION = 'SCREEN_TAG_CREATION';
const SCREEN_TAG_EDITION = 'SCREEN_TAG_EDITION';
const SCREEN_PREFERENCES = 'SCREEN_PREFERENCES';

export const routes = {
  [SCREEN_WORD_CAROUSEL]: {route: SCREEN_WORD_CAROUSEL},
  [SCREEN_WORD_CREATION]: {route: SCREEN_WORD_CREATION},
  [SCREEN_SETTINGS]: {route: SCREEN_SETTINGS, title: 'Settings'},
  [SCREEN_WORD_LIST]: {route: SCREEN_WORD_LIST, title: 'Words'},
  [SCREEN_WORD_EDITION]: {route: SCREEN_WORD_EDITION, title: 'Word Edition'},
  [SCREEN_TAG_LIST]: {route: SCREEN_TAG_LIST, title: 'Tags'},
  [SCREEN_TAG_CREATION]: {route: SCREEN_TAG_CREATION, title: 'Tag Creation'},
  [SCREEN_TAG_EDITION]: {route: SCREEN_TAG_EDITION, title: 'Tag Edition'},
  [SCREEN_PREFERENCES]: {route: SCREEN_PREFERENCES, title: 'Preferences'},
};
