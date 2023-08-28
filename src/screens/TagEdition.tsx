import React from 'react';

import {StyleSheet, View} from 'react-native';

import {TagEditionForm} from '../components';
import {TTag} from '../types';

import {useTheme} from '../hooks';
import {TTheme} from '../theme';

export const TagEdition = ({route, navigation}: any): JSX.Element => {
  const theme = useTheme();
  const tagToEdit = route.params as TTag;

  const styles = getStyles(theme);
  return (
    <View style={styles.root}>
      <TagEditionForm {...tagToEdit} navigation={navigation} />
    </View>
  );
};

const getStyles = (theme: TTheme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.COLORS.BG.PRIMARY,
      flex: 1,
    },
  });
