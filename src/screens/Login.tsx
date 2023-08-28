import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';

// PARA USAR EL BOTON
// TODO MANROMERO https://github.com/react-native-google-signin/google-signin#2-googlesigninbutton
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useTheme} from '../hooks';
import {TTheme} from '../theme';

GoogleSignin.configure({
  webClientId:
    '671886777936-ovfo24tj20cnrqq7ri4scunidukdvn9g.apps.googleusercontent.com',
});

export const Login = (): JSX.Element => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  const handleOnGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.label}>Before continue, please log in</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleOnGoogleButtonPress}
      />
    </View>
  );
};

const getStyles = (theme: TTheme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.COLORS.BG.PRIMARY,
      display: 'flex',
      flexDirection: 'column',
      padding: 10,
      marginTop: -100,
      gap: 20,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    label: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.COLORS.TEXT.PRIMARY,
      textAlign: 'center',
    },
  });
