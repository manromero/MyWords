// react
import React from 'react';

// react-native
import {StyleSheet, View} from 'react-native';

// inner components
import {WordEditionForm} from '../components';

// hooks
import {useTheme} from '../hooks';

// types
import {TTheme} from '../theme';

export const WordCreation = (): JSX.Element => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.root}>
      <WordEditionForm />
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
