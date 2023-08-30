// react
import React, {useState} from 'react';

// react-native
import {StyleSheet, View} from 'react-native';

// inner components
import {MWCard, MWPicker, MWTextInput} from '../commons';
import {WordPreviewContent} from './wordPreview';
import {TagsPreview} from '../tag';

// icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// firestore
import firestore from '@react-native-firebase/firestore';

// types
import {TWord} from '../../types';

// react-navigation
import {useNavigation} from '@react-navigation/native';

// hooks
import {useAuth, useData, useTheme} from '../../hooks';

// utils
import {showToast} from '../../utils';

type TWordEdition = TWord;

export const WordEditionForm = (props: TWordEdition): JSX.Element => {
  const {theme} = useTheme();

  const {user} = useAuth();
  const [id, setId] = useState(props.id);
  const [word, setWord] = useState(props.word ?? '');
  const [translation, setTranslation] = useState(props.translation ?? '');
  const [notes, setNotes] = useState(props.notes ?? '');
  const [showPreview, setShowPreview] = useState(false);
  const [tags, setTags] = useState<string[]>(props.tags ?? []);

  const {tags: alltags} = useData();

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

  const navigation = useNavigation();

  const handleOnSave = () => {
    const collection = firestore().collection('words');
    const wordDTO = {word, translation, notes, tags, userId: user?.uid};
    if (id) {
      collection
        .doc(id)
        .update(wordDTO)
        .then(() =>
          showToast({
            type: 'success',
            text1: 'Word updated',
          }),
        )
        .catch(() => {
          showToast({
            type: 'error',
            text1: 'Error when updating the word',
          });
        });
    } else {
      collection
        .add(wordDTO)
        .then(dataSaved => {
          setId(dataSaved.id);
          showToast({
            type: 'success',
            text1: 'Word created',
          });
        })
        .catch(() => {
          showToast({
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
        showToast({
          type: 'success',
          text1: 'Word deleted',
        });
        navigation.goBack();
      })
      .catch(() => {
        showToast({
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
          tags={alltags.data.filter(t => tags.includes(t.id as string))}
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
            options={alltags.data.map(t => ({
              label: t.label as string,
              value: t.id as string,
              selected: tags.includes(t.id as string),
            }))}
            onOptionPress={handleOnTagPress}
          />
          <TagsPreview
            tags={alltags.data.filter(t => tags.includes(t.id as string))}
            noTagsText="No tags selected"
          />
        </>
      )}
      <Icon.Button
        name={showPreview ? 'visibility-off' : 'visibility'}
        size={20}
        backgroundColor={
          disabled
            ? theme.COLORS.ACTION_BUTTON.PRIMARY_DISABLED_BG
            : theme.COLORS.ACTION_BUTTON.PRIMARY_ACTIVE_BG
        }
        color={
          disabled
            ? theme.COLORS.ACTION_BUTTON.PRIMARY_DISABLED_LABEL
            : theme.COLORS.ACTION_BUTTON.PRIMARY_ACTIVE_LABEL
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
            backgroundColor={theme.COLORS.ACTION_BUTTON.DELETE_ACTIVE_BG}
            color={theme.COLORS.ACTION_BUTTON.DELETE_ACTIVE_LABEL}
            onPress={handleOnDelete}>
            DELETE
          </Icon.Button>
        )}
        <Icon.Button
          name="save"
          size={20}
          backgroundColor={
            disabled
              ? theme.COLORS.ACTION_BUTTON.PRIMARY_DISABLED_BG
              : theme.COLORS.ACTION_BUTTON.PRIMARY_ACTIVE_BG
          }
          disabled={disabled}
          color={
            disabled
              ? theme.COLORS.ACTION_BUTTON.PRIMARY_DISABLED_LABEL
              : theme.COLORS.ACTION_BUTTON.PRIMARY_ACTIVE_LABEL
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
