const LightTheme = {
  COLORS: {
    STATUS: {
      DEFAULT: '#232323',
      ACTIVE: '#0a6aee',
      DISABLED: '#9f9f9f',
    },
    BG: {
      PRIMARY: '#f2f4f3',
      SECONDARY: '#ffffff',
      MODAL: '#4343437f',
    },
    TEXT: {
      PRIMARY: '#232323',
      SECONDARY: '#676767',
    },
    INPUT: {
      LABEL: '#676767',
      COLOR: '#232323',
      PLACEHOLDER: '#676767',
      BORDER_ACTIVE: '#232323',
      BORDER_INACTIVE: '#676767',
    },
    RADIO_BUTTON: {
      LABEL: '#676767',
      COLOR: '#232323',
    },
    FOOTER: {
      ITEM_ACTIVE: '#0a6aee',
      ITEM_INACTIVE: '#696d70',
    },
    PICKER: {
      ITEM_BG_SELECTED: '#c5e0f7',
      ITEM_BG_UNSELECTED: '#e3eef7',
      ITEM_LABEL_SELECTED: '#232323',
      ITEM_LABEL_UNSELECTED: '#232323',
    },
    ACTION_BUTTON: {
      PRIMARY_ACTIVE_BG: 'transparent',
      PRIMARY_ACTIVE_LABEL: '#0a6aee',
      PRIMARY_DISABLED_BG: 'transparent',
      PRIMARY_DISABLED_LABEL: '#737475',
      DELETE_ACTIVE_BG: 'transparent',
      DELETE_ACTIVE_LABEL: '#b70e0e',
      DELETE_DISABLED_BG: 'transparent',
      DELETE_DISABLED_LABEL: '#737475',
    },
    TAG: {
      DEFAULT_LABEL: '#232323',
      DEFAULT_BG: '#ffffff',
      DEFAULT_BORDER: '#232323',
    },
  },
};

const DarkTheme = {
  COLORS: {
    STATUS: {
      DEFAULT: '#ffffff',
      ACTIVE: '#297cda',
      DISABLED: '#737475',
    },
    BG: {
      PRIMARY: '#000000',
      SECONDARY: '#161618',
      MODAL: '#4343437f',
    },
    TEXT: {
      PRIMARY: '#ffffff',
      SECONDARY: '#aeb0b4',
    },
    INPUT: {
      LABEL: '#aeb0b4',
      COLOR: '#ffffff',
      PLACEHOLDER: '#aeb0b4',
      BORDER_ACTIVE: '#ffffff',
      BORDER_INACTIVE: '#aeb0b4',
    },
    RADIO_BUTTON: {
      LABEL: '#aeb0b4',
      COLOR: '#ffffff',
    },
    FOOTER: {
      ITEM_ACTIVE: '#297cda',
      ITEM_INACTIVE: '#737475',
    },
    PICKER: {
      ITEM_BG_SELECTED: '#313133',
      ITEM_BG_UNSELECTED: '#161618',
      ITEM_LABEL_SELECTED: '#ffffff',
      ITEM_LABEL_UNSELECTED: '#ffffff',
    },
    ACTION_BUTTON: {
      PRIMARY_ACTIVE_BG: 'transparent',
      PRIMARY_ACTIVE_LABEL: '#297cda',
      PRIMARY_DISABLED_BG: 'transparent',
      PRIMARY_DISABLED_LABEL: '#737475',
      DELETE_ACTIVE_BG: 'transparent',
      DELETE_ACTIVE_LABEL: '#f94f4f',
      DELETE_DISABLED_BG: 'transparent',
      DELETE_DISABLED_LABEL: '#737475',
    },
    TAG: {
      DEFAULT_LABEL: '#ffffff',
      DEFAULT_BG: '#000000',
      DEFAULT_BORDER: '#ffffff',
    },
  },
};

export const themes: TThemes = {
  light: LightTheme,
  dark: DarkTheme,
};

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

export type TThemeKey = keyof TThemes | 'automatic';
