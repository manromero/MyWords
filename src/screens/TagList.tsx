import React, {useEffect, useState} from 'react';

// components
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// firestore
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

// Toast
import Toast from 'react-native-toast-message';

// types
import {TTag} from '../types';
import {Theme} from '../theme';

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
      onPress={() => navigation.navigate('Edit Tag', props)}>
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
      borderBottomColor: Theme.COLORS.BORDER.PRIMRARY,
      borderBottomWidth: active ? 3 : 1,
      marginLeft: 5,
      marginRight: 5,
    },
  });
