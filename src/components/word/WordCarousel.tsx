import React from 'react';

import {WordPreview} from './wordPreview';
import Carousel from 'react-native-reanimated-carousel';
import {StyleSheet, Dimensions} from 'react-native';

import {TTag, TWord} from '../../types';

type TWordCarousel = {
  words: TWord[];
  tags: TTag[];
};

export const WordCarousel = (props: TWordCarousel): JSX.Element => {
  const windowWidth = Dimensions.get('window').width;
  return (
    <Carousel
      style={styles.carousel}
      loop
      width={windowWidth}
      data={props.words}
      scrollAnimationDuration={400}
      renderItem={({item}) => {
        const tags: TTag[] = props.tags.filter(t =>
          item.tags?.includes(t.id as string),
        );
        return <WordPreview key={item.id} {...item} tags={tags} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  carousel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
