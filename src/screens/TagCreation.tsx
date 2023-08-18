import React from 'react';

import {StyleSheet, View} from 'react-native';

import {Theme} from '../theme';
import {TagEditionForm} from '../components';

export const TagCreation = ({navigation}: any): JSX.Element => {
  return (
    <View style={styles.root}>
      <TagEditionForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Theme.COLORS.BG.PRIMARY,
    flex: 1,
  },
});
