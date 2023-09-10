export type TTheme = {
  COLORS: {
    STATUS: {
      DEFAULT: string;
      ACTIVE: string;
      DISABLED: string;
    };
    BG: {
      PRIMARY: string;
      SECONDARY: string;
      MODAL: string;
    };
    TEXT: {
      PRIMARY: string;
      SECONDARY: string;
    };
    TOAST: {
      BG: string;
      INFO_BORDER: string;
      SUCCESS_BORDER: string;
      ERROR_BORDER: string;
    };
    INPUT: {
      LABEL: string;
      COLOR: string;
      PLACEHOLDER: string;
      BORDER_ACTIVE: string;
      BORDER_INACTIVE: string;
    };
    RADIO_BUTTON: {
      LABEL: string;
      COLOR: string;
    };
    FOOTER: {
      ITEM_ACTIVE: string;
      ITEM_INACTIVE: string;
    };
    PICKER: {
      ITEM_BG_SELECTED: string;
      ITEM_BG_UNSELECTED: string;
      ITEM_LABEL_SELECTED: string;
      ITEM_LABEL_UNSELECTED: string;
    };
    ACTION_BUTTON: {
      PRIMARY_ACTIVE_BG: string;
      PRIMARY_ACTIVE_LABEL: string;
      PRIMARY_DISABLED_BG: string;
      PRIMARY_DISABLED_LABEL: string;
      DELETE_ACTIVE_BG: string;
      DELETE_ACTIVE_LABEL: string;
      DELETE_DISABLED_BG: string;
      DELETE_DISABLED_LABEL: string;
    };
    TAG: {
      DEFAULT_LABEL: string;
      DEFAULT_BG: string;
      DEFAULT_BORDER: string;
    };
  };
};

export type TThemes = {
  light: TTheme;
  dark: TTheme;
};

export type TThemeKey = 'automatic' | 'light' | 'dark';
