import React from 'react';

import {StyleSheet, View} from 'react-native';

import {WordEditionForm} from '../components';

import {useTheme} from '../hooks';

export const WordCreation = (): JSX.Element => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.root}>
      <WordEditionForm />
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.COLORS.BG.PRIMARY,
      flex: 1,
    },
  });
