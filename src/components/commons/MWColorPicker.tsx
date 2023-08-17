import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableHighlight,
  Modal,
} from 'react-native';

import ColorPicker, {
  Panel1,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';

type TMWColorPicker = {
  label?: string;
  placeholder?: string;
  value?: string;
  multiline?: boolean;
  onChangeColor?: (text: string) => void;
};

import Icon from 'react-native-vector-icons/MaterialIcons';

export const MWColorPicker = (props: TMWColorPicker): JSX.Element => {
  const [showPreview, setShowPreview] = useState(false);
  const [active, setActive] = useState(false);
  const [pickerColor, setPickerColor] = useState('');

  return (
    <View>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          style={inputStyles({active}).input}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.onChangeColor}
        />
        <TouchableHighlight onPress={() => setShowPreview(prevVal => !prevVal)}>
          <Icon
            name={showPreview ? 'visibility-off' : 'visibility'}
            size={20}
            color={'#00247e'}
          />
        </TouchableHighlight>
      </View>
      <Modal animationType="slide" transparent={true} visible={showPreview}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableHighlight
              style={styles.closeButton}
              onPress={() => setShowPreview(false)}>
              <Icon name={'close'} size={20} color={'#000000'} />
            </TouchableHighlight>
            <ColorPicker
              style={styles.colorPicker}
              onComplete={color => setPickerColor(color.hex)}
              value={props.value || '#000000'}>
              <Panel1 />
              <HueSlider />
              <OpacitySlider />
            </ColorPicker>
            <Button
              title="ELEGIR COLOR"
              color={'#00247e'}
              onPress={() => {
                setShowPreview(false);
                props.onChangeColor?.(pickerColor);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  label: {fontSize: 15, fontWeight: '400', color: '#959595'},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '70%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 10,
  },
  closeButton: {
    padding: 5,
    alignSelf: 'flex-end',
  },
  colorPicker: {gap: 10},
});

const inputStyles = ({active}: {active?: boolean}) =>
  StyleSheet.create({
    input: {
      flex: 1,
      borderBottomColor: '#00247e',
      borderBottomWidth: active ? 3 : 1,
    },
  });
