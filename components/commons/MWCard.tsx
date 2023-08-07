import React from 'react';

import {StyleSheet, View} from 'react-native';

export const MWCard = ({
  children,
}: React.PropsWithChildren<{}>): JSX.Element => {
  return <View style={styles.root}>{children}</View>;
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#e9e9e9',
    margin: 20,
    borderRadius: 30,
    padding: 40,
    paddingTop: 40,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
});
