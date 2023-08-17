import React, {useEffect, useState} from 'react';

// components
import {StyleSheet, View, FlatList, Text, TextInput} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

// firestore
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

// Toast
import Toast from 'react-native-toast-message';

// types
import {TTag} from '../types';

// TODO type
export const TagList = ({navigation}: any): JSX.Element => {
  const [tags, setTags] = useState<
    FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
  >([]);
  const [filter, setFilter] = useState('');
  const [inputActive, setInputActive] = useState(false);

  useEffect(() => {
    firestore()
      .collection('tags')
      .get()
      .then(response => {
        setTags(response.docs);
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Error when retrieving tags',
        });
      });
  }, []);
  return (
    <View style={styles.root}>
      <TextInput
        onFocus={() => setInputActive(true)}
        onBlur={() => setInputActive(false)}
        style={inputStyles({active: inputActive}).input}
        placeholder="Filter tags"
        value={filter}
        onChangeText={newFilter => setFilter(newFilter)}
      />
      <FlatList
        data={tags.filter(wordDoc => {
          const wordData = wordDoc.data();
          return wordData.label?.includes(filter);
        })}
        ItemSeparatorComponent={() => <View style={styles.itemsSeparator} />}
        renderItem={({item}) => (
          <Item
            key={item.id}
            navigation={navigation}
            id={item.id}
            {...(item.data() as TTag)}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#818181',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    padding: 10,
  },
  itemsSeparator: {height: 5},
});

const Item = ({
  navigation,
  ...props
}: TTag & {navigation: any}): JSX.Element => {
  return (
    <TouchableHighlight
      style={itemStyles.root}
      // TODO MANROMERO edition passing params
      onPress={() => navigation.navigate('Edit Tag', props)}>
      <Text style={itemStyles.label}>{props.label}</Text>
    </TouchableHighlight>
  );
};

const itemStyles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
    display: 'flex',
    justifyContent: 'center',
    borderColor: '#19191a',
    borderWidth: 1,
    borderRadius: 5,
  },
  label: {fontSize: 15, fontWeight: '400', color: '#1d1c1c'},
});

const inputStyles = ({active}: {active?: boolean}) =>
  StyleSheet.create({
    input: {
      backgroundColor: '#f8f8f8',
      borderBottomColor: '#00247e',
      borderBottomWidth: active ? 3 : 1,
    },
  });
