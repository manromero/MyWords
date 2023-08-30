// react
import React from 'react';

// react-native
import {StyleSheet, View} from 'react-native';

// inner components
import {TagEditionForm} from '../components';

// types
import {TNavigatorSettingsStackParamList, TTheme} from '../types';

// hooks
import {useTheme} from '../hooks';

// routes
import {routes} from '../routes';

// react-navigation
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

type TTagEdition = {
  route: RouteProp<TNavigatorSettingsStackParamList, routes.SCREEN_TAG_EDITION>;
  navigation: StackNavigationProp<
    TNavigatorSettingsStackParamList,
    routes.SCREEN_TAG_EDITION
  >;
};

export const TagEdition = ({route, navigation}: TTagEdition): JSX.Element => {
  const {theme} = useTheme();
  const tagToEdit = route.params;

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
