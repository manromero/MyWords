import React from 'react';

import {StyleSheet, View} from 'react-native';

import {WordEditionForm} from '../components';

import {useTheme} from '../hooks';
import {TTheme} from '../theme';

export const WordCreation = (): JSX.Element => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.root}>
      <WordEditionForm />
    </View>
  );
};

const getStyles = (theme: TTheme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.COLORS.BG.PRIMARY,
      flex: 1,
    },
  });
