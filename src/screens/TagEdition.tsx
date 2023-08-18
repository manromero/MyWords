import React from 'react';

import {StyleSheet, View} from 'react-native';

import {TagEditionForm} from '../components';
import {TTag} from '../types';
import {Theme} from '../theme';

export const TagEdition = ({route}: any): JSX.Element => {
  const tagToEdit = route.params as TTag;
  return (
    <View style={styles.root}>
      <TagEditionForm {...tagToEdit} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Theme.COLORS.BG.PRIMARY,
    flex: 1,
  },
});
