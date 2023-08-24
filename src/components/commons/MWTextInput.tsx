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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {fontSize: 15, fontWeight: '400', color: Theme.COLORS.TEXT.SECONDARY},
});

const inputStyles = ({active}: {active?: boolean}) =>
  StyleSheet.create({
    input: {
      borderBottomColor: Theme.COLORS.BORDER.PRIMARY,
      borderBottomWidth: active ? 3 : 1,
      color: Theme.COLORS.TEXT.PRIMARY,
    },
  });
