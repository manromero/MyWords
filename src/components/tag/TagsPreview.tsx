// react
import React from 'react';

// react-native
import {StyleSheet, Text, View} from 'react-native';

// types
import {TTag} from '../../types';
import {TTheme} from '../../theme';

// inner components
import {Tag} from './Tag';

// hooks
import {useTheme} from '../../hooks';

type TTagsPreview = {
  tags: TTag[];
  noTagsText?: string;
};

export const TagsPreview = (props: TTagsPreview): JSX.Element | null => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  if (props.tags.length === 0 && !props.noTagsText) {
    return null;
  }
  if (props.tags.length === 0 && props.noTagsText) {
    return (
      <View style={styles.root}>
        <Text style={styles.noTagsText}>{props.noTagsText}</Text>
      </View>
    );
  }
  return (
    <View style={styles.root}>
      {props.tags.map(t => {
        return (
          <Tag
            key={t.id}
            label={t.label as string}
            labelColor={t.labelColor as string}
            backgroundColor={t.backgroundColor as string}
            borderColor={t.borderColor as string}
          />
        );
      })}
    </View>
  );
};

const getStyles = (theme: TTheme) =>
  StyleSheet.create({
    root: {
      display: 'flex',
      flexDirection: 'row',
      gap: 7,
      flexWrap: 'wrap',
    },
    noTagsText: {color: theme.COLORS.TEXT.SECONDARY, fontSize: 13},
  });
