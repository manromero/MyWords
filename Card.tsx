/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

type TCard = {
  word: string;
  translation: string;
  notes?: string;
};

export const Card = (props: TCard): JSX.Element => {
  return (
    <View style={styles.root}>
      <Text style={styles.word}>{props.word}</Text>
      <View>
        <Text style={styles.label}>Translation</Text>
        <Text style={styles.translation}>{props.translation}</Text>
      </View>
      {props.notes && (
        <View>
          <Text style={styles.label}>Notes</Text>
          <Text style={styles.notes}>{props.notes}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#e9e9e9',
    height: '70%',
    margin: 30,
    borderRadius: 30,
    padding: 30,
    paddingTop: 40,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  word: {
    fontSize: 30,
    fontWeight: '600',
    color: '#393939',
    textAlign: 'center',
  },
  label: {fontSize: 15, fontWeight: '400', color: '#959595'},
  translation: {fontSize: 30, fontWeight: '600', color: '#393939'},
  notes: {fontSize: 20, fontWeight: '600', color: '#393939'},
});
