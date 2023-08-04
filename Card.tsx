/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/MaterialIcons';

Tts.setDefaultLanguage('en-gb');

type TCard = {
  word: string;
  translation?: string;
  notes?: string;
};

export const Card = (props: TCard): JSX.Element => {
  const handleVoice = () => {
    Tts.getInitStatus().then(() => {
      Tts.speak(props.word);
    });
  };

  return (
    <View style={styles.root}>
      <Text style={styles.word}>{props.word}</Text>
      {props.translation && (
        <View>
          <Text style={styles.label}>Translation</Text>
          <Text style={styles.translation}>{props.translation}</Text>
        </View>
      )}
      {props.notes && (
        <View>
          <Text style={styles.label}>Notes</Text>
          <Text style={styles.notes}>{props.notes}</Text>
        </View>
      )}
      <View style={styles.iconWrapper}>
        <Icon
          name="volume-up"
          size={30}
          color="#017aeb"
          onPress={handleVoice}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#e9e9e9',
    margin: 20,
    borderRadius: 30,
    padding: 50,
    paddingTop: 40,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  word: {
    fontSize: 35,
    fontWeight: '600',
    color: '#393939',
    textAlign: 'center',
  },
  label: {fontSize: 15, fontWeight: '400', color: '#959595'},
  translation: {fontSize: 30, fontWeight: '600', color: '#393939'},
  notes: {fontSize: 20, fontWeight: '600', color: '#393939'},
  iconWrapper: {display: 'flex', flexDirection: 'row-reverse'},
});
