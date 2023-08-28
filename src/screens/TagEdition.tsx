// react
import React from 'react';

// react-native
import {StyleSheet, View} from 'react-native';

// inner components
import {TagEditionForm} from '../components';

// types
import {TTag} from '../types';
import {TTheme} from '../theme';

// hooks
import {useTheme} from '../hooks';

export const TagEdition = ({route, navigation}: any): JSX.Element => {
  const {theme} = useTheme();
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
