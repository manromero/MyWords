import React from 'react';

import {StyleSheet, View} from 'react-native';

// theme
import {useTheme} from '../../hooks';

export const MWCard = ({
  children,
}: React.PropsWithChildren<{}>): JSX.Element => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return <View style={styles.root}>{children}</View>;
};

const getStyles = (theme: any) =>
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
