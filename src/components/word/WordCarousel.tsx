// react
import React from 'react';

// react-native
import {StyleSheet, Dimensions, Text} from 'react-native';

// react-native-reanimated-carousel
import Carousel from 'react-native-reanimated-carousel';

// inner components
import {WordPreview} from './wordPreview';
import {MWCard} from '../commons';

// types
import {TTag, TTheme, TWord} from '../../types';

// hook
import {useTheme} from '../../hooks';

type TWordCarousel = {
  words: TWord[];
  tags: TTag[];
};

export const WordCarousel = (props: TWordCarousel): JSX.Element => {
  const windowWidth = Dimensions.get('window').width;
  const {theme} = useTheme();

  const styles = getStyles(theme);

  if (props.words.length === 0) {
    return (
      <MWCard>
        <Text style={styles.noCardsTtitle}>No words have been found</Text>
        <Text style={styles.noCardsSubtitle}>
          Update the filter or create new ones
        </Text>
      </MWCard>
    );
  }
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

const getStyles = (theme: TTheme) =>
  StyleSheet.create({
    noCardsTtitle: {
      color: theme.COLORS.TEXT.PRIMARY,
      textAlign: 'center',
      fontSize: 20,
    },
    noCardsSubtitle: {
      color: theme.COLORS.TEXT.SECONDARY,
      textAlign: 'center',
      fontSize: 17,
    },
    carousel: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
