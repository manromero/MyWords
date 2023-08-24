import React from 'react';

import {StyleSheet, View, Text} from 'react-native';

type TTag = {
  label: string;
  labelColor: string;
  backgroundColor: string;
  borderColor: string;
};

export const Tag = (props: TTag): JSX.Element => {
  const styles = getStyles({
    labelColor: props.labelColor,
    backgroundColor: props.backgroundColor,
    borderColor: props.borderColor,
  });
  return (
    <View style={styles.root}>
      <Text style={styles.label}>{props.label}</Text>
    </View>
  );
};

const getStyles = ({
  labelColor,
  backgroundColor,
  borderColor,
}: {
  labelColor: string;
  backgroundColor: string;
  borderColor: string;
}) =>
  StyleSheet.create({
    root: {
      alignSelf: 'flex-start',
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: 1,
      borderRadius: 2,
    },
    label: {color: labelColor, padding: 5, fontSize: 15},
  });
