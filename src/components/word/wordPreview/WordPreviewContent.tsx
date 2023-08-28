import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TTag, TWord} from '../../../types';

// firestore
import firestore from '@react-native-firebase/firestore';

// Toast
import Toast from 'react-native-toast-message';

import {TagsPreview} from '../../tag';
import {useTheme} from '../../../hooks';
import {TTheme} from '../../../theme';

Tts.setDefaultLanguage('en-gb');

type TWordPreviewContent = Omit<TWord, 'tags'> & {tags: TTag[]} & {
  showLearnedIcon?: boolean;
};

export const WordPreviewContent = ({
  showLearnedIcon = true,
  ...props
}: TWordPreviewContent): JSX.Element => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const handlePlaySound = () => {
    Tts.getInitStatus().then(() => {
      Tts.speak(props.word ?? '');
    });
  };

  const handleOnPressLearnedIcon = () => {
    const collection = firestore().collection('words');
    const newLearnedValue = !props.learned;
    collection
      .doc(props.id)
      .update({learned: newLearnedValue})
      .then(() =>
        Toast.show({
          type: 'success',
          text1: newLearnedValue
            ? 'New word learned!'
            : "Don't worry, keep going!",
        }),
      )
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Unexpected error',
        });
      });
  };

  return (
    <>
      <View style={styles.wordAndPlaySoundWrapper}>
        <Text style={styles.word}>{props.word}</Text>
        <Icon
          name="volume-up"
          aria-label="Play sound"
          size={30}
          color={theme.COLORS.STATUS.ACTIVE}
          onPress={handlePlaySound}
        />
      </View>

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
      {showLearnedIcon && props.id && (
        <View style={styles.learnedIconWrapper}>
          <Icon
            name="task-alt"
            aria-label={props.learned ? 'Mark as unlearned' : 'Mark as learned'}
            size={30}
            color={
              props.learned
                ? theme.COLORS.STATUS.ACTIVE
                : theme.COLORS.STATUS.DISABLED
            }
            onPress={handleOnPressLearnedIcon}
          />
        </View>
      )}
      {props.tags && props.tags.length > 0 && <TagsPreview tags={props.tags} />}
    </>
  );
};

const getStyles = (theme: TTheme) =>
  StyleSheet.create({
    wordAndPlaySoundWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    word: {
      flex: 1,
      fontSize: 35,
      fontWeight: '600',
      color: theme.COLORS.TEXT.PRIMARY,
      textAlign: 'center',
    },
    label: {
      fontSize: 15,
      fontWeight: '400',
      color: theme.COLORS.TEXT.SECONDARY,
    },
    translation: {
      fontSize: 30,
      fontWeight: '600',
      color: theme.COLORS.TEXT.PRIMARY,
    },
    notes: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.COLORS.TEXT.PRIMARY,
    },
    learnedIconWrapper: {display: 'flex', flexDirection: 'row-reverse'},
  });
