import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
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
import {MWModal} from './MWModal';

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
      <MWModal open={showPreview} onClose={() => setShowPreview(false)}>
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
      </MWModal>
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
      color: Theme.COLORS.TEXT.PRIMARY,
    },
  });
