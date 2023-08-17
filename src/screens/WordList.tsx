import React, {useEffect, useState} from 'react';

import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

// Toast
import Toast from 'react-native-toast-message';
import {TWord} from '../types';

import {Theme} from '../theme';

// TODO type
export const WordList = ({navigation}: any): JSX.Element => {
  const [words, setWords] = useState<
    FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
  >([]);
  const [filter, setFilter] = useState('');
  const [inputActive, setInputActive] = useState(false);

  useEffect(() => {
    firestore()
      .collection('words')
      .get()
      .then(response => {
        setWords(response.docs);
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Error when retrieving the words',
        });
      });
  }, []);
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
        data={words.filter(wordDoc => {
          const wordData = wordDoc.data();
          return (
            wordData.word?.includes(filter) ||
            wordData.translation?.includes(filter) ||
            wordData.notes?.includes(filter)
          );
        })}
        renderItem={({item}) => (
          <Item
            key={item.id}
            navigation={navigation}
            id={item.id}
            {...(item.data() as TWord)}
          />
        )}
        keyExtractor={item => item.id}
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
      // TODO MANROMERO edition passing params
      onPress={() => navigation.navigate('Word Edition', props)}>
      <Text style={itemStyles.label}>{props.word}</Text>
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
      backgroundColor: Theme.COLORS.BG.SECONDARY,
      borderBottomColor: Theme.COLORS.BORDER.PRIMARY,
      borderBottomWidth: active ? 3 : 1,
      marginLeft: 5,
      marginRight: 5,
    },
  });
