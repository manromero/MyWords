import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
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
import {Theme} from '../../theme';

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
        <TouchableOpacity
          style={styles.showModalIconWrapper}
          onPress={() => setShowPreview(prevVal => !prevVal)}>
          <Icon
            name={showPreview ? 'visibility-off' : 'visibility'}
            size={20}
            color={Theme.COLORS.ICONS.INFO}
          />
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={showPreview}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPreview(false)}>
              <Icon
                name={'close'}
                size={20}
                color={Theme.COLORS.ICONS.PRIMARY}
              />
            </TouchableOpacity>
            <ColorPicker
              style={styles.colorPicker}
              onComplete={color => setPickerColor(color.hex)}
              value={props.value || '#000000'}>
              <Panel1 />
              <HueSlider />
              <OpacitySlider />
            </ColorPicker>
            <TouchableOpacity
              style={styles.chooseColorButton}
              onPress={() => {
                setShowPreview(false);
                props.onChangeColor?.(pickerColor);
              }}>
              <Text style={styles.chooseColorButtonText}>SELECT COLOR</Text>
            </TouchableOpacity>
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
  },
  label: {fontSize: 15, fontWeight: '400', color: Theme.COLORS.TEXT.SECONDARY},
  showModalIconWrapper: {padding: 5},
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
    padding: 20,
    shadowColor: Theme.COLORS.SHADOW.PRIMARY,
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
  chooseColorButton: {
    backgroundColor: Theme.COLORS.BG.ACTION_PRIMARY,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chooseColorButtonText: {
    color: Theme.COLORS.TEXT.ACTION_PRIMARY,
    fontWeight: '700',
  },
});

const inputStyles = ({active}: {active?: boolean}) =>
  StyleSheet.create({
    input: {
      flex: 1,
      borderBottomColor: Theme.COLORS.BORDER.PRIMARY,
      borderBottomWidth: active ? 3 : 1,
    },
  });
