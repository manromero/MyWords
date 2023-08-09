import React from 'react';

import {StyleSheet, View} from 'react-native';

import {WordEdition} from '../components';

export const WordCreation = (): JSX.Element => {
  return (
    <View style={styles.root}>
      <WordEdition />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#575757',
    flex: 1,
  },
});
