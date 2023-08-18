import React from 'react';

import {StyleSheet, View} from 'react-native';

// theme
import {Theme} from '../../theme';

export const MWCard = ({
  children,
}: React.PropsWithChildren<{}>): JSX.Element => {
  return <View style={styles.root}>{children}</View>;
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Theme.COLORS.BG.SECONDARY,
    margin: 20,
    borderRadius: 30,
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    shadowColor: Theme.COLORS.SHADOW.PRIMARY,
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
});
