import React, {useState} from 'react';

import {StyleSheet, View, Text} from 'react-native';
import {MWCard, MWTextInput, MWColorPicker, MWTag} from '../components';

import Icon from 'react-native-vector-icons/MaterialIcons';

// firestore
import firestore from '@react-native-firebase/firestore';

// Toast
import Toast from 'react-native-toast-message';
import {Theme} from '../theme';

export const TagCreation = (): JSX.Element => {
  const [id, setId] = useState('');
  const [label, setLabel] = useState('test');
  const [labelColor, setLabelColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#fffff');
  const [borderColor, setBorderColor] = useState('#000000');

  const handleOnSave = () => {
    const collection = firestore().collection('tags');
    const tagDTO = {label, labelColor, backgroundColor, borderColor};
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

  const disabled = !label || !labelColor || !backgroundColor || !borderColor;

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
          label="Tag label color:"
          placeholder="Insert here the label color"
          value={labelColor}
          onChangeColor={text => setLabelColor(text)}
        />
        <MWColorPicker
          label="Tag background color:"
          placeholder="Insert here the background color"
          value={backgroundColor}
          onChangeColor={text => setBackgroundColor(text)}
        />
        <MWColorPicker
          label="Tag border color:"
          placeholder="Insert here the border color"
          value={borderColor}
          onChangeColor={text => setBorderColor(text)}
        />
        {label && (
          <View style={styles.previewWrapper}>
            <Text style={styles.previewLabel}>Preview:</Text>
            <MWTag
              label={label}
              labelColor={labelColor}
              backgroundColor={backgroundColor}
              borderColor={borderColor}
            />
          </View>
        )}
        <View style={styles.footer}>
          <Icon.Button
            name="delete"
            size={20}
            backgroundColor={Theme.COLORS.BG.ACTION_DELETE}
            color={Theme.COLORS.TEXT.ACTION_DELETE}
            onPress={() => {}}>
            DELETE
          </Icon.Button>
          <Icon.Button
            name="save"
            size={20}
            backgroundColor={
              disabled
                ? Theme.COLORS.BG.DISABLED
                : Theme.COLORS.BG.ACTION_PRIMARY
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
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Theme.COLORS.BG.PRIMARY,
    flex: 1,
  },
  previewWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  previewLabel: {
    fontSize: 15,
    fontWeight: '400',
    color: Theme.COLORS.TEXT.SECONDARY,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
});
