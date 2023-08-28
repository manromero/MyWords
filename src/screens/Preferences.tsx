import React, {useContext} from 'react';

import {StyleSheet, View, Text} from 'react-native';

// Toast
import {useTheme} from '../hooks';
import {MWCard, MWRadioButton} from '../components';
import {ThemeContext} from '../context';
import {TTheme} from '../theme';

// TODO type
export const Preferences = (): JSX.Element => {
  const {themeKey, changeThemeKey} = useContext(ThemeContext);
  const theme = useTheme();

  const styles = getStyles(theme);
  return (
    <View style={styles.root}>
      <MWCard>
        <Text style={styles.label}>Select theme:</Text>
        <MWRadioButton
          label="Automatic"
          selected={themeKey === 'automatic'}
          onPress={selected => selected && changeThemeKey('automatic')}
        />
        <MWRadioButton
          label="Dark"
          selected={themeKey === 'dark'}
          onPress={selected => selected && changeThemeKey('dark')}
        />
        <MWRadioButton
          label="Light"
          selected={themeKey === 'light'}
          onPress={selected => selected && changeThemeKey('light')}
        />
      </MWCard>
    </View>
  );
};

const getStyles = (theme: TTheme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.COLORS.BG.PRIMARY,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 15,
    },
    label: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.COLORS.RADIO_BUTTON.LABEL,
    },
  });
