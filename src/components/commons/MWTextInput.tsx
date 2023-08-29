// react
import React, {useState} from 'react';

// react-native
import {StyleSheet, Text, TextInput, View} from 'react-native';

// hooks
import {useTheme} from '../../hooks';

// types
import {TTheme} from '../../theme';

type TMWTextInput = {
  label?: string;
  placeholder?: string;
  value?: string;
  multiline?: boolean;
  onChangeText?: (text: string) => void;
};

export const MWTextInput = (props: TMWTextInput): JSX.Element => {
  const {theme} = useTheme();
  const [active, setActive] = useState(false);
  return (
    <View>
      {props.label && <Text style={styles(theme).label}>{props.label}</Text>}
      <TextInput
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        style={inputStyles({active, theme}).input}
        placeholder={props.placeholder}
        value={props.value}
        multiline={props.multiline}
        onChangeText={props.onChangeText}
        placeholderTextColor={theme.COLORS.INPUT.PLACEHOLDER}
      />
    </View>
  );
};

const styles = (theme: TTheme) =>
  StyleSheet.create({
    label: {
      fontSize: 15,
      fontWeight: '400',
      color: theme.COLORS.INPUT.LABEL,
    },
  });

const inputStyles = ({active, theme}: {active?: boolean; theme: TTheme}) =>
  StyleSheet.create({
    input: {
      borderBottomColor: active
        ? theme.COLORS.INPUT.BORDER_ACTIVE
        : theme.COLORS.INPUT.BORDER_INACTIVE,
      borderBottomWidth: active ? 2 : 1,
      color: theme.COLORS.INPUT.COLOR,
    },
  });
