// react
import React from 'react';

// react native
import {StyleSheet, View, FlatList, Text, TouchableOpacity} from 'react-native';

// icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// firebase auth TODO MANROMERO, debería ir por el useAuth?
import auth from '@react-native-firebase/auth';

// hooks
import {useTheme, useToast} from '../hooks';

// types
import {TNavigatorSettingsStackParamList, TTheme} from '../types';

// routes
import {routes, routesOptions} from '../routes';

// react-natigation
import {StackNavigationProp} from '@react-navigation/stack';

type TNavigation = StackNavigationProp<
  TNavigatorSettingsStackParamList,
  routes.SCREEN_SETTINGS
>;

type TSettings = {
  navigation: TNavigation;
};

type TOption = {
  title: string;
  icon: string;
  route?:
    | routes.SCREEN_WORD_LIST
    | routes.SCREEN_TAG_LIST
    | routes.SCREEN_TAG_CREATION
    | routes.SCREEN_PREFERENCES;
  onPress?: () => void;
};

export const Settings = ({navigation}: TSettings): JSX.Element => {
  const {theme} = useTheme();
  const {showToast} = useToast();
  const styles = getStyles(theme);

  const listOptions: TOption[] = [
    {
      title: routesOptions.SCREEN_WORD_LIST.title,
      icon: 'format-list-bulleted',
      route: routes.SCREEN_WORD_LIST,
    },
    {
      title: routesOptions.SCREEN_TAG_LIST.title,
      icon: 'bookmarks',
      route: routes.SCREEN_TAG_LIST,
    },
    {
      title: routesOptions.SCREEN_TAG_CREATION.title,
      icon: 'bookmark-add',
      route: routes.SCREEN_TAG_CREATION,
    },
    {
      title: routesOptions.SCREEN_PREFERENCES.title,
      icon: 'bookmark-add',
      route: routes.SCREEN_PREFERENCES,
    },
    {
      title: 'Log Out',
      icon: 'logout',
      onPress: () => {
        auth()
          .signOut()
          .then(() =>
            showToast({
              type: 'success',
              text1: 'Log out successfully',
            }),
          )
          .catch(() =>
            showToast({
              type: 'error',
              text1: 'Unexpected error loging out',
            }),
          );
      },
    },
  ];
  return (
    <View style={styles.root}>
      <FlatList
        data={listOptions}
        renderItem={({item}) => (
          <Item key={item.title} navigation={navigation} {...item} />
        )}
        keyExtractor={item => item.title}
      />
    </View>
  );
};

const getStyles = (theme: TTheme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.COLORS.BG.PRIMARY,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 15,
    },
  });

const Item = (props: TOption & {navigation: TNavigation}): JSX.Element => {
  const {theme} = useTheme();
  const itemStyles = getItemStyles(theme);
  return (
    <TouchableOpacity
      style={itemStyles.root}
      onPress={() => {
        if (props.onPress) {
          props.onPress();
        }
        if (props.route) {
          props.navigation.navigate(props.route);
        }
      }}>
      <Icon
        name={props.icon}
        aria-label="Play sound"
        size={20}
        color={theme.COLORS.STATUS.DEFAULT}
      />
      <Text style={itemStyles.label}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const getItemStyles = (theme: TTheme) =>
  StyleSheet.create({
    root: {
      flex: 1,
      padding: 10,
      paddingTop: 15,
      paddingBottom: 15,
      backgroundColor: theme.COLORS.BG.SECONDARY,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginBottom: 10,
    },
    label: {
      fontSize: 15,
      fontWeight: '400',
      color: theme.COLORS.TEXT.PRIMARY,
    },
  });
