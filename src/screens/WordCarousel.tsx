import React, {useEffect, useState} from 'react';

import {StyleSheet, View, TouchableOpacity} from 'react-native';

import {TagsFilter, WordCarousel as WordCarouselComponent} from '../components';

import firestore, {
  FirebaseFirestoreTypes,
  firebase,
} from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/MaterialIcons';

// Toast
import Toast from 'react-native-toast-message';
import {Theme} from '../theme';

export const WordCarousel = (): JSX.Element => {
  const [words, setWords] = useState<
    FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
  >([]);
  const [openFilter, setOpenFilter] = useState(false);
  // TODO MANROMERO Type
  const [filter, setFilter] = useState<any>({tags: []});

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
    // const filters = [];
    // const tagRef = new firebase.firestore.FieldPath('tags', 'label');

    // TODO MANROMERO
    const subscriber = firestore()
      .collection('words')
      // https://stackoverflow.com/questions/59374452/firestore-query-where-filter-of-object-in-array-field
      // Quizás solo deba almacenar el tag id
      .where('tags', 'array-contains', {label: 'viajes'})
      .onSnapshot(handleOnSnapShotResults, handleOnSnapShotError);
    return () => subscriber();
  }, [filter]);

  return (
    <View style={styles.root}>
      <WordCarouselComponent data={words} />
      <TouchableOpacity
        style={styles.filterIcon}
        onPress={() => setOpenFilter(true)}>
        <Icon
          name={'filter-list'}
          size={30}
          color={Theme.COLORS.ICONS.PRIMARY}
        />
      </TouchableOpacity>
      <TagsFilter
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        onFilter={newFilter => setFilter(newFilter)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Theme.COLORS.BG.PRIMARY,
    flex: 1,
  },
  filterIcon: {
    width: 50,
    height: 50,
    backgroundColor: Theme.COLORS.BG.SECONDARY,
    shadowColor: Theme.COLORS.SHADOW.PRIMARY,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 20,
    right: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
