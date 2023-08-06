import React, {useState} from 'react';

import {StyleSheet, Button, Text, TextInput, View} from 'react-native';
import {MWTextInput} from './components';
import Icon from 'react-native-vector-icons/MaterialIcons';

type TCard = {
  word: string;
  translation?: string;
  notes?: string;
};

export const ConcepEdit = (props: TCard): JSX.Element => {
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [notes, setNotes] = useState('');
  return (
    <View style={styles.root}>
      <MWTextInput
        label="Word or concept:"
        placeholder="Insert here word or concept"
        value={word}
        onChangeText={text => setWord(text)}
      />
      <MWTextInput
        label="Translation:"
        placeholder="Insert here translation"
        value={translation}
        onChangeText={text => setTranslation(text)}
      />
      <MWTextInput
        label="Notes:"
        placeholder="Insert here notes in markdown format"
        value={notes}
        onChangeText={text => setNotes(text)}
        multiline
      />
      <Icon.Button
        name="visibility"
        size={20}
        backgroundColor={'#e9e9e9'}
        color={'#00247e'}>
        PREVIEW
      </Icon.Button>
      <View style={styles.footer}>
        <Icon.Button
          name="delete-outline"
          size={20}
          backgroundColor={'#7e0000'}
          color={'#ffffff'}>
          DELETE
        </Icon.Button>
        <Icon.Button
          name="save"
          size={20}
          backgroundColor={'#00247e'}
          color={'#ffffff'}>
          SAVE
        </Icon.Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#e9e9e9',
    margin: 20,
    borderRadius: 30,
    padding: 40,
    paddingTop: 40,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
});
