import React, {useEffect, useState} from 'react';

import {StyleSheet, View} from 'react-native';

import {WordCarousel as WordCarouselComponent} from '../components';

import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

// Toast
import Toast from 'react-native-toast-message';
import {Theme} from '../theme';

export const WordCarousel = (): JSX.Element => {
  const [words, setWords] = useState<
    FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
  >([]);

  const handleOnSnapShotResults = (
    query: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
  ) => {
    setWords(query.docs);
  };

  const handleOnSnapShotError = () => {
    Toast.show({
      type: 'error',
      text1: 'Error when retrieving the words',
    });
  };

  // TODO MANROMERO, maybe on fetch instead of subscrition??
  useEffect(() => {
    const subscriber = firestore()
      .collection('words')
      .onSnapshot(handleOnSnapShotResults, handleOnSnapShotError);
    return () => subscriber();
  }, []);

  return (
    <View style={styles.root}>
      <WordCarouselComponent data={words} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Theme.COLORS.BG.PRIMARY,
    flex: 1,
  },
});
