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

import {MWModal} from './MWModal';
import {useTheme} from '../../hooks';
import {TTheme} from '../../theme';

export const MWColorPicker = (props: TMWColorPicker): JSX.Element => {
  const [showPreview, setShowPreview] = useState(false);
  const [active, setActive] = useState(false);
  const [pickerColor, setPickerColor] = useState('');
  const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <View>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          style={inputStyles({active, theme}).input}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.onChangeColor}
          placeholderTextColor={theme.COLORS.INPUT.PLACEHOLDER}
        />
        <TouchableOpacity
          style={styles.showModalIconWrapper}
          onPress={() => setShowPreview(prevVal => !prevVal)}>
          <Icon
            name={showPreview ? 'visibility-off' : 'visibility'}
            size={20}
            color={theme.COLORS.STATUS.ACTIVE}
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

const getStyles = (theme: TTheme) =>
  StyleSheet.create({
    inputWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    label: {
      fontSize: 15,
      fontWeight: '400',
      color: theme.COLORS.INPUT.LABEL,
    },
    showModalIconWrapper: {padding: 5},
    colorPicker: {gap: 10},
    chooseColorButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    chooseColorButtonText: {
      color: theme.COLORS.STATUS.ACTIVE,
      fontWeight: '700',
    },
  });

const inputStyles = ({active, theme}: {active?: boolean; theme: TTheme}) =>
  StyleSheet.create({
    input: {
      flex: 1,
      borderBottomColor: active
        ? theme.COLORS.INPUT.BORDER_ACTIVE
        : theme.COLORS.INPUT.BORDER_INACTIVE,
      borderBottomWidth: active ? 2 : 1,
      color: theme.COLORS.INPUT.COLOR,
    },
  });
