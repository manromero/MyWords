import React, {useState} from 'react';

import {StyleSheet, View} from 'react-native';
import {MWCard, MWTextInput, MWColorPicker} from '../components';

import Icon from 'react-native-vector-icons/MaterialIcons';

// firestore
import firestore from '@react-native-firebase/firestore';

// Toast
import Toast from 'react-native-toast-message';

export const TagCreation = (): JSX.Element => {
  const [id, setId] = useState('');
  const [label, setLabel] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [labelColor, setLabelColor] = useState('');

  const handleOnSave = () => {
    const collection = firestore().collection('tags');
    const tagDTO = {label, backgroundColor, labelColor};
    if (id) {
      collection
        .doc(id)
        .update(tagDTO)
        .then(() =>
          Toast.show({
            type: 'success',
            text1: 'Tag updated',
          }),
        )
        .catch(() => {
          Toast.show({
            type: 'error',
            text1: 'Error when updating the tag',
          });
        });
    } else {
      collection
        .add(tagDTO)
        .then(dataSaved => {
          setId(dataSaved.id);
          Toast.show({
            type: 'success',
            text1: 'Tag created',
          });
        })
        .catch(() => {
          Toast.show({
            type: 'error',
            text1: 'Error when creating the tag',
          });
        });
    }
  };

  const disabled = !label || !backgroundColor || !labelColor;

  return (
    <View style={styles.root}>
      <MWCard>
        <MWTextInput
          label="Tag label:"
          placeholder="Insert here the tag label"
          value={label}
          onChangeText={text => setLabel(text)}
        />
        <MWColorPicker
          label="Tag background color:"
          placeholder="Insert here the background color"
          value={backgroundColor}
          onChangeColor={text => setBackgroundColor(text)}
        />
        <MWColorPicker
          label="Tag label color:"
          placeholder="Insert here the label color"
          value={labelColor}
          onChangeColor={text => setLabelColor(text)}
        />
        <View style={styles.footer}>
          <Icon.Button
            name="delete-outline"
            size={20}
            backgroundColor={'#7e0000'}
            color={'#ffffff'}
            onPress={() => {}}>
            DELETE
          </Icon.Button>
          <Icon.Button
            name="save"
            size={20}
            backgroundColor={disabled ? '#666666' : '#00247e'}
            disabled={disabled}
            color={'#ffffff'}
            onPress={handleOnSave}>
            SAVE
          </Icon.Button>
        </View>
      </MWCard>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#575757',
    flex: 1,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
});
