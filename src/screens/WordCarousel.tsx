import React, {useEffect, useState} from 'react';

import {StyleSheet, View, TouchableOpacity} from 'react-native';

import {TagsFilter, WordCarousel as WordCarouselComponent} from '../components';

import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/MaterialIcons';

// Toast
import Toast from 'react-native-toast-message';

// theme
import {Theme} from '../theme';

// types
import {TTag} from '../types';

export const WordCarousel = (): JSX.Element => {
  const [words, setWords] = useState<
    FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
  >([]);
  const [tags, setTags] = useState<
    FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
  >([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState<{tags: TTag[]}>({tags: []});

  const handleOnSnapShotTagsResults = (
    query: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
  ) => {
    setTags(query.docs);
  };

  const handleOnSnapShotTagsError = () => {
    Toast.show({
      type: 'error',
      text1: 'Error when retrieving the tags',
    });
  };

  // Retrieve tags
  useEffect(() => {
    const subscriber = firestore()
      .collection('tags')
      .onSnapshot(handleOnSnapShotTagsResults, handleOnSnapShotTagsError);
    return () => subscriber();
  }, []);

  const handleOnSnapShotWordsResults = (
    query: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
  ) => {
    setWords(query.docs);
  };

  const handleOnSnapShotWordsError = () => {
    Toast.show({
      type: 'error',
      text1: 'Error when retrieving the words',
    });
  };

  // Retreive words
  useEffect(() => {
    const tagsIdFilters = filter.tags.map(t => t.id);
    let collectionReference: any = firestore().collection('words');
    if (tagsIdFilters.length > 0) {
      collectionReference = collectionReference.where(
        'tags',
        'array-contains-any',
        tagsIdFilters,
      );
    }
    const subscriber = collectionReference.onSnapshot(
      handleOnSnapShotWordsResults,
      handleOnSnapShotWordsError,
    );
    return () => subscriber();
  }, [filter]);

  return (
    <View style={styles.root}>
      <WordCarouselComponent words={words} tags={tags} />
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
        onFilter={newFilter => {
          setOpenFilter(false);
          setFilter(newFilter);
        }}
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
