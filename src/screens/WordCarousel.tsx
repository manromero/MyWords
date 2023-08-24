import React, {useContext, useState} from 'react';

import {StyleSheet, View, TouchableOpacity} from 'react-native';

import {TagsFilter, WordCarousel as WordCarouselComponent} from '../components';

import Icon from 'react-native-vector-icons/MaterialIcons';

// theme
import {Theme} from '../theme';

// types
import {DataContext} from '../context';
import {TWord} from '../types';

export const WordCarousel = (): JSX.Element => {
  const {words, tags} = useContext(DataContext);
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState<{tags: string[]}>({tags: []});

  let filteredWords: TWord[] = words.data;
  if (filter.tags.length > 0) {
    filteredWords = words.data.filter(word =>
      word.tags?.some(wordTagId => filter.tags.includes(wordTagId)),
    );
  }

  return (
    <View style={styles.root}>
      <WordCarouselComponent words={filteredWords} tags={tags.data} />
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
