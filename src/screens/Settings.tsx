import React from 'react';

import {StyleSheet, View, FlatList, Text, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {Theme} from '../theme';

import auth from '@react-native-firebase/auth';

// Toast
import Toast from 'react-native-toast-message';

const routes = [
  {name: 'Words', icon: 'format-list-bulleted', route: 'Words'},
  {name: 'Tags', icon: 'bookmarks', route: 'Tags'},
  {name: 'Tag Creation', icon: 'bookmark-add', route: 'Tag Creation'},
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

const styles = StyleSheet.create({
  root: {
    backgroundColor: Theme.COLORS.BG.PRIMARY,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
});

const Item = (props: any & {navigation: any}): JSX.Element => {
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
        color={Theme.COLORS.ICONS.PRIMARY}
      />
      <Text style={itemStyles.label}>{props.name}</Text>
    </TouchableOpacity>
  );
};

const itemStyles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: Theme.COLORS.BG.PRIMARY,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderBottomColor: Theme.COLORS.BORDER.SECONDARY,
    borderBottomWidth: 1,
  },
  label: {fontSize: 15, fontWeight: '400', color: Theme.COLORS.TEXT.PRIMARY},
});
