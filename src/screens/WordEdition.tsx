// react
import React from 'react';

// react-native
import {StyleSheet, View} from 'react-native';

// inner components
import {WordEditionForm} from '../components';

// types
import {TNavigatorSettingsStackParamList, TWord} from '../types';
import {TTheme} from '../theme';

// hooks
import {useTheme} from '../hooks';

// routes
import {routes} from '../routes';

// react-navigation
import {RouteProp} from '@react-navigation/native';

type TWordEdition = {
  route: RouteProp<
    TNavigatorSettingsStackParamList,
    routes.SCREEN_WORD_EDITION
  >;
};

export const WordEdition = ({route}: TWordEdition): JSX.Element => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const wordToEdit = route.params as TWord;
  return (
    <View style={styles.root}>
      <WordEditionForm {...wordToEdit} />
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
