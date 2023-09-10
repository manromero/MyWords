/* eslint-disable react/no-unstable-nested-components */
// react
import React from 'react';

// toast
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {TTheme} from '../../types';
import {useTheme} from '../../hooks';

export const MWToast = () => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const config = {
    info: (props: any) => (
      <BaseToast
        {...props}
        style={styles.info}
        text1Style={styles.text1}
        text2Style={styles.text2}
      />
    ),
    success: (props: any) => (
      <BaseToast
        {...props}
        style={styles.success}
        text1Style={styles.text1}
        text2Style={styles.text2}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={styles.error}
        text1Style={styles.text1}
        text2Style={styles.text2}
      />
    ),
  };
  return <Toast config={config} />;
};

const getStyles = (theme: TTheme) => ({
  info: {
    borderLeftColor: theme.COLORS.TOAST.INFO_BORDER,
    backgroundColor: theme.COLORS.TOAST.BG,
  },
  success: {
    borderLeftColor: theme.COLORS.TOAST.SUCCESS_BORDER,
    backgroundColor: theme.COLORS.TOAST.BG,
  },
  error: {
    borderLeftColor: theme.COLORS.TOAST.ERROR_BORDER,
    backgroundColor: theme.COLORS.TOAST.BG,
  },
  text1: {color: theme.COLORS.TEXT.PRIMARY},
  text2: {
    color: theme.COLORS.TEXT.PRIMARY,
  },
});
