export enum routes {
  SCREEN_WORD_CAROUSEL = 'SCREEN_WORD_CAROUSEL',
  SCREEN_WORD_CREATION = 'SCREEN_WORD_CREATION',
  SCREEN_SETTINGS = 'SCREEN_SETTINGS',
  SCREEN_WORD_LIST = 'SCREEN_WORD_LIST',
  SCREEN_WORD_EDITION = 'SCREEN_WORD_EDITION',
  SCREEN_TAG_LIST = 'SCREEN_TAG_LIST',
  SCREEN_TAG_CREATION = 'SCREEN_TAG_CREATION',
  SCREEN_TAG_EDITION = 'SCREEN_TAG_EDITION',
  SCREEN_PREFERENCES = 'SCREEN_PREFERENCES',
}

export const routesOptions = {
  [routes.SCREEN_WORD_CAROUSEL]: {},
  [routes.SCREEN_WORD_CREATION]: {},
  [routes.SCREEN_SETTINGS]: {
    title: 'Settings',
  },
  [routes.SCREEN_WORD_LIST]: {
    title: 'Words',
  },
  [routes.SCREEN_WORD_EDITION]: {
    title: 'Word Edition',
  },
  [routes.SCREEN_TAG_LIST]: {
    title: 'Tags',
  },
  [routes.SCREEN_TAG_CREATION]: {
    title: 'Tag Creation',
  },
  [routes.SCREEN_TAG_EDITION]: {
    title: 'Tag Edition',
  },
  [routes.SCREEN_PREFERENCES]: {
    title: 'Preferences',
  },
};
