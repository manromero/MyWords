import React from 'react';

import {StyleSheet, View} from 'react-native';

import {WordEditionForm} from '../components';
import {Theme} from '../theme';

export const WordCreation = (): JSX.Element => {
  return (
    <View style={styles.root}>
      <WordEditionForm />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Theme.COLORS.BG.PRIMARY,
    flex: 1,
  },
});
