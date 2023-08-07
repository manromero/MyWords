import React from 'react';

import {StyleSheet, View} from 'react-native';

import {WordCarousel as WordCarouselComponent} from '../components';

export const WordCarousel = (): JSX.Element => {
  return (
    <View style={styles.root}>
      <WordCarouselComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#575757',
    flex: 1,
  },
});
