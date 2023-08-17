import React, {useEffect, useState} from 'react';

import {StyleSheet, View} from 'react-native';
import {MWCard, MWTextInput} from '../commons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {WordPreviewContent} from './wordPreview';

// firestore
import firestore from '@react-native-firebase/firestore';

// Toast
import Toast from 'react-native-toast-message';

// types
import {TWord} from '../../types';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Theme} from '../../theme';

type TWordEdition = TWord;

export const WordEdition = (props: TWordEdition): JSX.Element => {
  const [id, setId] = useState(props.id);
  const [word, setWord] = useState(props.word ?? '');
  const [translation, setTranslation] = useState(props.translation ?? '');
  const [notes, setNotes] = useState(props.notes ?? '');
  const [showPreview, setShowPreview] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    // TODO MANROMERO revisar
    // when the screen is focused
    setId(props.id);
    setWord(props.word ?? '');
    setTranslation(props.translation ?? '');
    setNotes(props.notes ?? '');
    setShowPreview(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // when the screen is unfocused
        setId(undefined);
        setWord('');
        setTranslation('');
        setNotes('');
        setShowPreview(false);
      };
    }, []),
  );

  const handleOnSave = () => {
    const collection = firestore().collection('words');
    const wordDTO = {word, translation, notes};
    if (id) {
      collection
        .doc(id)
        .update(wordDTO)
        .then(() =>
          Toast.show({
            type: 'success',
            text1: 'Word updated',
          }),
        )
        .catch(() => {
          Toast.show({
            type: 'error',
            text1: 'Error when updating the word',
          });
        });
    } else {
      collection
        .add(wordDTO)
        .then(dataSaved => {
          setId(dataSaved.id);
          Toast.show({
            type: 'success',
            text1: 'Word created',
          });
        })
        .catch(() => {
          Toast.show({
            type: 'error',
            text1: 'Error when creating the word',
          });
        });
    }
  };

  const handleOnDelete = () => {
    const collection = firestore().collection('words');
    collection
      .doc(id)
      .delete()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Word deleted',
        });
        // TODO manromero revisar
        navigation.goBack();
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Error when deleting the word',
        });
      });
  };

  const disabled = !word;

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
        backgroundColor={Theme.COLORS.BG.ACTION_PRIMARY}
        color={
          disabled
            ? Theme.COLORS.TEXT.DISABLED
            : Theme.COLORS.TEXT.ACTION_PRIMARY
        }
        disabled={disabled}
        onPress={() => setShowPreview(prevVal => !prevVal)}>
        {showPreview ? 'RAW' : 'PREVIEW'}
      </Icon.Button>
      <View style={styles.footer}>
        {id && (
          <Icon.Button
            name="delete"
            size={20}
            backgroundColor={Theme.COLORS.BG.ACTION_DELETE}
            color={Theme.COLORS.TEXT.ACTION_DELETE}
            onPress={handleOnDelete}>
            DELETE
          </Icon.Button>
        )}
        <Icon.Button
          name="save"
          size={20}
          backgroundColor={
            disabled ? Theme.COLORS.BG.DISABLED : Theme.COLORS.BG.ACTION_PRIMARY
          }
          disabled={disabled}
          color={
            disabled
              ? Theme.COLORS.TEXT.DISABLED
              : Theme.COLORS.TEXT.ACTION_PRIMARY
          }
          onPress={handleOnSave}>
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
