import React from 'react';

import {StyleSheet, View} from 'react-native';

import {WordEdition as WordEditionComponent} from '../components';
import {TWord} from '../types';
import {Theme} from '../theme';

export const WordEdition = ({route}: any): JSX.Element => {
  const wordToEdit = route.params as TWord;
  // TODO MANROMERO revisar
  console.log(wordToEdit);
  return (
    <View style={styles.root}>
      <WordEditionComponent {...wordToEdit} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Theme.COLORS.BG.PRIMARY,
    flex: 1,
  },
});
