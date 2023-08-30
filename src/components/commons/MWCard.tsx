// react
import React from 'react';

// react-native
import {StyleSheet, View} from 'react-native';

// hooks
import {useTheme} from '../../hooks';

// types
import {TTheme} from '../../types';

export const MWCard = ({
  children,
}: React.PropsWithChildren<{}>): JSX.Element => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  return <View style={styles.root}>{children}</View>;
};

const getStyles = (theme: TTheme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.COLORS.BG.SECONDARY,
      margin: 20,
      borderRadius: 30,
      padding: 30,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      elevation: 1,
    },
  });
