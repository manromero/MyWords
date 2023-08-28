import React, {useContext} from 'react';

import {StyleSheet, View, Text} from 'react-native';

// Toast
import {useTheme} from '../hooks';
import {MWCard, MWRadioButton} from '../components';
import {AuthContext, DataContext, ThemeContext} from '../context';
import {TTheme, TThemeKey} from '../theme';

// firestore
import firestore from '@react-native-firebase/firestore';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

// TODO type
export const Preferences = (): JSX.Element => {
  const {preferences} = useContext(DataContext);
  const {user} = useContext(AuthContext);

  const {themeKey} = useContext(ThemeContext);
  const theme = useTheme();

  const handleChangeTheme = (newTheme: TThemeKey) => {
    const collection = firestore().collection('preferences');
    const id = preferences.data.id;
    const preferencesDTO = {theme: newTheme, userId: user?.uid};
    if (id) {
      collection
        .doc(id)
        .update(preferencesDTO)
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Them updated',
          });
        })
        .catch(() => {
          Toast.show({
            type: 'error',
            text1: 'Error when updating the theme',
          });
        });
    } else {
      collection
        .add(preferencesDTO)
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Preferences updated',
          });
        })
        .catch(() => {
          Toast.show({
            type: 'error',
            text1: 'Error when updating the preferences',
          });
        });
    }
  };

  const styles = getStyles(theme);
  return (
    <View style={styles.root}>
      <MWCard>
        <Text style={styles.label}>Select theme:</Text>
        <MWRadioButton
          label="Automatic"
          selected={themeKey === 'automatic'}
          onPress={selected => selected && handleChangeTheme('automatic')}
        />
        <MWRadioButton
          label="Dark"
          selected={themeKey === 'dark'}
          onPress={selected => selected && handleChangeTheme('dark')}
        />
        <MWRadioButton
          label="Light"
          selected={themeKey === 'light'}
          onPress={selected => selected && handleChangeTheme('light')}
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
