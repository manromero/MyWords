// react
import React, {useState} from 'react';

// react-native
import {StyleSheet, View, TouchableOpacity} from 'react-native';

// inner components
import {
  WordsFilter,
  WordCarousel as WordCarouselComponent,
} from '../components';

// icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// types
import {TWord, TTheme, TWordsFilter, TWordsFilterLearned} from '../types';

// hooks
import {useData, useTheme} from '../hooks';

export const WordCarousel = (): JSX.Element => {
  const {theme} = useTheme();

  const {words, tags} = useData();
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState<TWordsFilter>({
    tags: [],
    learnedFilter: TWordsFilterLearned.NOT_LEARNED,
  });

  const styles = getStyles(theme);

  let filteredWords: TWord[] = words.data;
  filteredWords = words.data.filter(word => {
    // Filter by learned
    if (filter.learnedFilter === TWordsFilterLearned.LEARNED && !word.learned) {
      return false;
    }
    if (
      filter.learnedFilter === TWordsFilterLearned.NOT_LEARNED &&
      word.learned
    ) {
      return false;
    }
    // Filter by tags
    if (
      filter.tags.length > 0 &&
      !word.tags?.some(wordTagId => filter.tags.includes(wordTagId))
    ) {
      return false;
    }
    return true;
  });

  return (
    <View style={styles.root}>
      <WordCarouselComponent words={filteredWords} tags={tags.data} />
      <TouchableOpacity
        style={styles.filterIcon}
        onPress={() => setOpenFilter(true)}>
        <Icon
          name={'filter-list'}
          size={30}
          color={theme.COLORS.TEXT.PRIMARY}
        />
      </TouchableOpacity>
      <WordsFilter
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

const getStyles = (theme: TTheme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.COLORS.BG.PRIMARY,
      flex: 1,
    },
    filterIcon: {
      width: 50,
      height: 50,
      backgroundColor: theme.COLORS.BG.SECONDARY,
      elevation: 1,
      position: 'absolute',
      bottom: 20,
      right: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },
  });
