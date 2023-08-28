import React from 'react';

import {StyleSheet, View} from 'react-native';

import {WordEditionForm} from '../components';
import {TWord} from '../types';

import {useTheme} from '../hooks';
import {TTheme} from '../theme';

export const WordEdition = ({route}: any): JSX.Element => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const wordToEdit = route.params as TWord;
  return (
    <View style={styles.root}>
      <WordEditionForm {...wordToEdit} />
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
