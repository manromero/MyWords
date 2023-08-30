// react
import React from 'react';

// react-native
import {StyleSheet, View} from 'react-native';

// inner components
import {TagEditionForm} from '../components';

// hooks
import {useTheme} from '../hooks';

// types
import {TNavigatorSettingsStackParamList, TTheme} from '../types';

// routes
import {routes} from '../routes';

// react-navigation
import {StackNavigationProp} from '@react-navigation/stack';

type TTagCreation = {
  navigation: StackNavigationProp<
    TNavigatorSettingsStackParamList,
    routes.SCREEN_TAG_EDITION
  >;
};

export const TagCreation = ({navigation}: TTagCreation): JSX.Element => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.root}>
      <TagEditionForm navigation={navigation} />
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
