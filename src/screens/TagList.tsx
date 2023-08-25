import React, {useContext, useState} from 'react';

// components
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// types
import {TTag} from '../types';
import {DataContext} from '../context';
import {useTheme} from '../hooks';

// TODO type
export const TagList = ({navigation}: any): JSX.Element => {
  const theme = useTheme();
  const {tags} = useContext(DataContext);
  const [filter, setFilter] = useState('');
  const [inputActive, setInputActive] = useState(false);

  const styles = getStyles(theme);

  return (
    <View style={styles.root}>
      <TextInput
        onFocus={() => setInputActive(true)}
        onBlur={() => setInputActive(false)}
        style={inputStyles({active: inputActive, theme}).input}
        placeholder="Filter tags"
        value={filter}
        onChangeText={newFilter => setFilter(newFilter)}
        placeholderTextColor={theme.COLORS.INPUT.PLACEHOLDER}
      />
      <FlatList
        data={tags.data.filter(({label}) => label?.includes(filter))}
        renderItem={({item}) => (
          <Item key={item.id} navigation={navigation} {...(item as TTag)} />
        )}
        keyExtractor={item => item.id as string}
      />
    </View>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.COLORS.BG.PRIMARY,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 15,
      padding: 10,
    },
  });

const Item = ({
  navigation,
  ...props
}: TTag & {navigation: any}): JSX.Element => {
  const theme = useTheme();
  const itemStyles = getItemStyles(theme);
  return (
    <TouchableOpacity
      style={itemStyles.root}
      // TODO MANROMERO edition passing params
      onPress={() => navigation.navigate('Tag Edition', props as TTag)}>
      <Text style={itemStyles.label}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const getItemStyles = (theme: any) =>
  StyleSheet.create({
    root: {
      flex: 1,
      padding: 10,
      margin: 5,
      backgroundColor: theme.COLORS.BG.SECONDARY,
      display: 'flex',
      justifyContent: 'center',
      borderRadius: 5,
      elevation: 1,
    },
    label: {
      fontSize: 15,
      fontWeight: '400',
      color: theme.COLORS.TEXT.PRIMARY,
    },
  });

const inputStyles = ({active, theme}: {active?: boolean; theme: any}) =>
  StyleSheet.create({
    input: {
      borderBottomColor: active
        ? theme.COLORS.INPUT.BORDER_ACTIVE
        : theme.COLORS.INPUT.BORDER_INACTIVE,
      borderBottomWidth: active ? 2 : 1,
      marginLeft: 5,
      marginRight: 5,
      color: theme.COLORS.INPUT.COLOR,
    },
  });
