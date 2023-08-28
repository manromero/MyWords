import React from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {useTheme} from '../../hooks';
import {TTheme} from '../../theme';

type TMWRadioButton = {
  label?: string;
  selected?: boolean;
  onPress?: (selected: boolean) => void;
};

export const MWRadioButton = (props: TMWRadioButton): JSX.Element => {
  const {theme} = useTheme();

  const styles = getStyles(theme);

  return (
    <TouchableOpacity
      style={styles.root}
      onPress={() => props.onPress?.(!props.selected)}>
      <View style={styles.circleOutside}>
        {props.selected && <View style={styles.circleInside} />}
      </View>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
    </TouchableOpacity>
  );
};

const getStyles = (theme: TTheme) =>
  StyleSheet.create({
    root: {
      display: 'flex',
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    label: {
      fontSize: 15,
      fontWeight: '400',
      color: theme.COLORS.RADIO_BUTTON.LABEL,
    },
    circleOutside: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderColor: theme.COLORS.RADIO_BUTTON.COLOR,
      borderWidth: 2,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    circleInside: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: theme.COLORS.RADIO_BUTTON.COLOR,
    },
  });
