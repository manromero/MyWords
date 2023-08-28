import React, {useState} from 'react';

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

import {useData, useTheme} from '../hooks';
import {TTheme} from '../theme';

// TODO type
export const WordList = ({navigation}: any): JSX.Element => {
  const {words} = useData();
  const [filter, setFilter] = useState('');
  const [inputActive, setInputActive] = useState(false);

  const {theme} = useTheme();
  const styles = getStyles(theme);
  const inputStyles = getInputStyles({active: inputActive, theme});

  return (
    <View style={styles.root}>
      <TextInput
        onFocus={() => setInputActive(true)}
        onBlur={() => setInputActive(false)}
        style={inputStyles.input}
        placeholder="Filter words"
        value={filter}
        onChangeText={newFilter => setFilter(newFilter)}
        placeholderTextColor={theme.COLORS.INPUT.PLACEHOLDER}
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

const getStyles = (theme: TTheme) =>
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
}: TWord & {navigation: any}): JSX.Element => {
  const {theme} = useTheme();
  const itemStyles = getItemStyles(theme);
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

const getItemStyles = (theme: TTheme) =>
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

const getInputStyles = ({active, theme}: {active?: boolean; theme: TTheme}) =>
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
