import React from 'react';

import {StyleSheet, View, Text} from 'react-native';

type TMWTag = {
  label: string;
  labelColor: string;
  backgroundColor: string;
  borderColor: string;
};

export const MWTag = (props: TMWTag): JSX.Element => {
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
      padding: 5,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: 1,
      borderRadius: 2,
    },
    label: {color: labelColor, fontSize: 15},
  });
