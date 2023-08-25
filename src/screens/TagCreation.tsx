import React from 'react';

import {StyleSheet, View} from 'react-native';

import {TagEditionForm} from '../components';
import {useTheme} from '../hooks';

export const TagCreation = ({navigation}: any): JSX.Element => {
  const theme = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.root}>
      <TagEditionForm navigation={navigation} />
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.COLORS.BG.PRIMARY,
      flex: 1,
    },
  });
