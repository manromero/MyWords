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
import {Theme} from '../theme';
import {DataContext} from '../context';

// TODO type
export const TagList = ({navigation}: any): JSX.Element => {
  const {tags} = useContext(DataContext);
  const [filter, setFilter] = useState('');
  const [inputActive, setInputActive] = useState(false);

  return (
    <View style={styles.root}>
      <TextInput
        onFocus={() => setInputActive(true)}
        onBlur={() => setInputActive(false)}
        style={inputStyles({active: inputActive}).input}
        placeholder="Filter tags"
        value={filter}
        onChangeText={newFilter => setFilter(newFilter)}
        placeholderTextColor={Theme.COLORS.INPUT.PLACEHOLDER}
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

const styles = StyleSheet.create({
  root: {
    backgroundColor: Theme.COLORS.BG.PRIMARY,
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
  return (
    <TouchableOpacity
      style={itemStyles.root}
      // TODO MANROMERO edition passing params
      onPress={() => navigation.navigate('Tag Edition', props as TTag)}>
      <Text style={itemStyles.label}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const itemStyles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor: Theme.COLORS.BG.SECONDARY,
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 5,
    elevation: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '400',
    color: Theme.COLORS.TEXT.PRIMARY,
  },
});

const inputStyles = ({active}: {active?: boolean}) =>
  StyleSheet.create({
    input: {
      borderBottomColor: active
        ? Theme.COLORS.INPUT.BORDER_ACTIVE
        : Theme.COLORS.INPUT.BORDER_INACTIVE,
      borderBottomWidth: active ? 2 : 1,
      marginLeft: 5,
      marginRight: 5,
      color: Theme.COLORS.INPUT.COLOR,
    },
  });
