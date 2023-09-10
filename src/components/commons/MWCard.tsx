// react
import React from 'react';

// react-native
import {StyleSheet, View} from 'react-native';

// hooks
import {useTheme} from '../../hooks';

// types
import {TTheme} from '../../types';
import {ScrollView} from 'react-native-gesture-handler';

export const MWCard = ({
  children,
}: React.PropsWithChildren<{}>): JSX.Element => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        {children}
      </ScrollView>
    </View>
  );
};

const getStyles = (theme: TTheme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.COLORS.BG.SECONDARY,
      margin: 20,
      borderRadius: 30,
      elevation: 1,
    },
    scrollViewContentContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      padding: 30,
    },
  });
