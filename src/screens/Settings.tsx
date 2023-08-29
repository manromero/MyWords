// react
import React from 'react';

// react native
import {StyleSheet, View, FlatList, Text, TouchableOpacity} from 'react-native';

// icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// firebase auth TODO MANROMERO, debería ir por el useAuth?
import auth from '@react-native-firebase/auth';

// Toast
import Toast from 'react-native-toast-message';

// hooks
import {useTheme} from '../hooks';

// types
import {TTheme} from '../theme';

const routes = [
  {name: 'Words', icon: 'format-list-bulleted', route: 'Words'},
  {name: 'Tags', icon: 'bookmarks', route: 'Tags'},
  {name: 'Tag Creation', icon: 'bookmark-add', route: 'Tag Creation'},
  {name: 'Preferences', icon: 'bookmark-add', route: 'Preferences'},
  {
    name: 'Log Out',
    icon: 'logout',
    onPress: () => {
      auth()
        .signOut()
        .then(() =>
          Toast.show({
            type: 'success',
            text1: 'Log out successfully',
          }),
        )
        .catch(() =>
          Toast.show({
            type: 'error',
            text1: 'Unexpected error loging out',
          }),
        );
    },
  },
];

// TODO type
export const Settings = ({navigation}: any): JSX.Element => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.root}>
      <FlatList
        data={routes}
        renderItem={({item}) => (
          <Item key={item.name} navigation={navigation} {...item} />
        )}
        keyExtractor={item => item.name}
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

const Item = (props: any & {navigation: any}): JSX.Element => {
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
      <Text style={itemStyles.label}>{props.name}</Text>
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
