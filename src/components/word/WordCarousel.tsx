import React from 'react';

import {WordPreview} from './wordPreview';
import Carousel from 'react-native-reanimated-carousel';
import {StyleSheet, Dimensions} from 'react-native';

import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {TWord} from '../../types';

type TWordCarousel = {
  data: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[];
};

export const WordCarousel = (props: TWordCarousel): JSX.Element => {
  const windowWidth = Dimensions.get('window').width;
  return (
    <Carousel
      style={styles.carousel}
      loop
      width={windowWidth}
      data={props.data}
      scrollAnimationDuration={400}
      renderItem={({item}) => (
        <WordPreview key={item.id} id={item.id} {...(item.data() as TWord)} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  carousel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
