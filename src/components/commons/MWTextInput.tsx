import React, {useState} from 'react';

import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Theme} from '../../theme';

type TMWTextInput = {
  label?: string;
  placeholder?: string;
  value?: string;
  multiline?: boolean;
  onChangeText?: (text: string) => void;
};

export const MWTextInput = (props: TMWTextInput): JSX.Element => {
  const [active, setActive] = useState(false);
  return (
    <View>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        style={inputStyles({active}).input}
        placeholder={props.placeholder}
        value={props.value}
        multiline={props.multiline}
        onChangeText={props.onChangeText}
        placeholderTextColor={Theme.COLORS.INPUT.PLACEHOLDER}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    fontWeight: '400',
    color: Theme.COLORS.INPUT.LABEL,
  },
});

const inputStyles = ({active}: {active?: boolean}) =>
  StyleSheet.create({
    input: {
      borderBottomColor: active
        ? Theme.COLORS.INPUT.BORDER_ACTIVE
        : Theme.COLORS.INPUT.BORDER_INACTIVE,
      borderBottomWidth: active ? 2 : 1,
      color: Theme.COLORS.INPUT.COLOR,
    },
  });
