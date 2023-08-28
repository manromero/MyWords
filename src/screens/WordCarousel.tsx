// react
import React, {useState} from 'react';

// react-native
import {StyleSheet, View, TouchableOpacity} from 'react-native';

// inner components
import {TagsFilter, WordCarousel as WordCarouselComponent} from '../components';

// icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// types
import {TWord} from '../types';
import {TTheme} from '../theme';

// hooks
import {useData, useTheme} from '../hooks';

export const WordCarousel = (): JSX.Element => {
  const {theme} = useTheme();

  const {words, tags} = useData();
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState<{tags: string[]}>({tags: []});

  const styles = getStyles(theme);

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
          color={theme.COLORS.TEXT.PRIMARY}
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
