import React from 'react';

import {StyleSheet, View} from 'react-native';

import {WordEdition as WordEditionComponent} from '../components';

export const WordEdition = (): JSX.Element => {
  return (
    <View style={styles.root}>
      <WordEditionComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#575757',
    flex: 1,
  },
});
