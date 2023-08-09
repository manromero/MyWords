import React from 'react';

import {WordPreview} from './wordPreview';
import Carousel from 'react-native-reanimated-carousel';
import {StyleSheet, Dimensions} from 'react-native';

import words from '../../words.json';

export const WordCarousel = (): JSX.Element => {
  const windowWidth = Dimensions.get('window').width;
  return (
    <Carousel
      style={styles.carousel}
      loop
      width={windowWidth}
      data={words}
      scrollAnimationDuration={400}
      renderItem={({item}) => <WordPreview key={item.word} {...item} />}
    />
  );
};

const styles = StyleSheet.create({
  carousel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
