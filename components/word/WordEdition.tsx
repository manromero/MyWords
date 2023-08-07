import React, {useState} from 'react';

import {StyleSheet, View} from 'react-native';
import {MWCard, MWTextInput} from '../commons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {WordPreviewContent} from './wordPreview';

type TWordEdition = {
  word?: string;
  translation?: string;
  notes?: string;
};

export const WordEdition = (props: TWordEdition): JSX.Element => {
  const [word, setWord] = useState(props.word ?? '');
  const [translation, setTranslation] = useState(props.translation);
  const [notes, setNotes] = useState(props.notes);
  const [showPreview, setShowPreview] = useState(false);
  return (
    <MWCard>
      {showPreview ? (
        <WordPreviewContent
          word={word}
          translation={translation}
          notes={notes}
          showLearnedIcon={false}
        />
      ) : (
        <>
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
        </>
      )}
      <Icon.Button
        name={showPreview ? 'visibility-off' : 'visibility'}
        size={20}
        backgroundColor={'#e9e9e9'}
        color={word ? '#00247e' : '#666666'}
        disabled={!word}
        onPress={() => setShowPreview(prevVal => !prevVal)}>
        {showPreview ? 'RAW' : 'PREVIEW'}
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
          backgroundColor={word ? '#00247e' : '#666666'}
          disabled={!word}
          color={'#ffffff'}>
          SAVE
        </Icon.Button>
      </View>
    </MWCard>
  );
};

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
});
