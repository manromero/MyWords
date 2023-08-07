import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/MaterialIcons';

Tts.setDefaultLanguage('en-gb');

type TWordPreviewContent = {
  word: string;
  translation?: string;
  notes?: string;
  showLearnedIcon?: boolean;
  learned?: boolean;
};

export const WordPreviewContent = ({
  showLearnedIcon = true,
  ...props
}: TWordPreviewContent): JSX.Element => {
  const handlePlaySound = () => {
    Tts.getInitStatus().then(() => {
      Tts.speak(props.word);
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
          color="#017aeb"
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
      {showLearnedIcon && (
        <View style={styles.learnedIconWrapper}>
          <Icon
            name="task-alt"
            aria-label={props.learned ? 'Mark as unlearned' : 'Mark as learned'}
            size={30}
            color={props.learned ? '#007e1d' : '#656565'}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
    color: '#393939',
    textAlign: 'center',
  },
  label: {fontSize: 15, fontWeight: '400', color: '#959595'},
  translation: {fontSize: 30, fontWeight: '600', color: '#393939'},
  notes: {fontSize: 20, fontWeight: '600', color: '#393939'},
  learnedIconWrapper: {display: 'flex', flexDirection: 'row-reverse'},
});
