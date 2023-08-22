import React, {useEffect, useState} from 'react';

import {StyleSheet, View} from 'react-native';
import {MWCard, MWPicker, MWTagsPreview, MWTextInput} from '../commons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {WordPreviewContent} from './wordPreview';

// firestore
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

// Toast
import Toast from 'react-native-toast-message';

// types
import {TWord} from '../../types';

import {useNavigation} from '@react-navigation/native';
import {Theme} from '../../theme';

type TWordEdition = TWord;

export const WordEditionForm = (props: TWordEdition): JSX.Element => {
  const [id, setId] = useState(props.id);
  const [word, setWord] = useState(props.word ?? '');
  const [translation, setTranslation] = useState(props.translation ?? '');
  const [notes, setNotes] = useState(props.notes ?? '');
  const [showPreview, setShowPreview] = useState(false);
  const [fullTags, setFullTags] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>(props.tags ?? []);

  const handleOnTagPress = (value: string) => {
    if (tags.includes(value)) {
      // remove
      const newTags = tags.filter(t => t !== value);
      setTags(newTags);
    } else {
      // add
      const newTags = [...tags, value];
      setTags(newTags);
    }
  };

  const handleOnSnapShotResults = (
    query: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
  ) => {
    setFullTags(query.docs);
  };

  const handleOnSnapShotError = () => {
    Toast.show({
      type: 'error',
      text1: 'Error when retrieving the tags',
    });
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('tags')
      .onSnapshot(handleOnSnapShotResults, handleOnSnapShotError);
    return () => subscriber();
  }, []);

  const navigation = useNavigation();

  const handleOnSave = () => {
    const collection = firestore().collection('words');
    const wordDTO = {word, translation, notes, tags};
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
          tags={fullTags.filter(t => tags.includes(t.id)).map(t => t.data())}
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
          <MWPicker
            buttonLabel={'Update tags'}
            options={fullTags.map(t => ({
              label: t.data().label as string,
              value: t.id as string,
              selected: tags.includes(t.id),
            }))}
            onOptionPress={handleOnTagPress}
          />
          <MWTagsPreview
            tags={fullTags.filter(t => tags.includes(t.id)).map(t => t.data())}
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
