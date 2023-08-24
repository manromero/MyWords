import React, {useContext, useState} from 'react';

import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// Toast
import {TWord} from '../types';

import {Theme} from '../theme';
import {DataContext} from '../context';

// TODO type
export const WordList = ({navigation}: any): JSX.Element => {
  const {words} = useContext(DataContext);
  const [filter, setFilter] = useState('');
  const [inputActive, setInputActive] = useState(false);

  return (
    <View style={styles.root}>
      <TextInput
        onFocus={() => setInputActive(true)}
        onBlur={() => setInputActive(false)}
        style={inputStyles({active: inputActive}).input}
        placeholder="Filter words"
        value={filter}
        onChangeText={newFilter => setFilter(newFilter)}
      />
      <FlatList
        data={words.data.filter(({word, translation, notes}) => {
          return (
            word?.includes(filter) ||
            translation?.includes(filter) ||
            notes?.includes(filter)
          );
        })}
        renderItem={({item}) => (
          <Item key={item.id} navigation={navigation} {...(item as TWord)} />
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
}: TWord & {navigation: any}): JSX.Element => {
  return (
    <TouchableOpacity
      style={itemStyles.root}
      onPress={() => navigation.navigate('Word Edition', props as TWord)}>
      <Text style={itemStyles.label} numberOfLines={1}>
        {props.word}
        {props.translation ? ` - ${props.translation}` : ''}
        {!props.translation && props.notes ? ` - ${props.notes}` : ''}
      </Text>
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
    shadowColor: Theme.COLORS.SHADOW.PRIMARY,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  label: {fontSize: 15, fontWeight: '400', color: Theme.COLORS.TEXT.PRIMARY},
});

const inputStyles = ({active}: {active?: boolean}) =>
  StyleSheet.create({
    input: {
      borderBottomColor: Theme.COLORS.BORDER.PRIMARY,
      borderBottomWidth: active ? 3 : 1,
      marginLeft: 5,
      marginRight: 5,
    },
  });
