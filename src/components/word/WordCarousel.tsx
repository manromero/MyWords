import React from 'react';

import {WordPreview} from './wordPreview';
import Carousel from 'react-native-reanimated-carousel';
import {StyleSheet, Dimensions} from 'react-native';

import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {TTag, TWord} from '../../types';

type TWordCarousel = {
  words: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[];
  tags: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[];
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
        const tags: TTag[] = props.tags
          .filter(t => item.data().tags.includes(t.id))
          .map(t => t.data());
        return (
          <WordPreview
            key={item.id}
            id={item.id}
            {...(item.data() as TWord)}
            tags={tags}
          />
        );
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
