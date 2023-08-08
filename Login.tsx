// TODO MANROMERO this is a login example file
// First follow the steps in https://rnfirebase.io/

import React, {useState, useEffect} from 'react';
import {Button} from 'react-native';
import auth from '@react-native-firebase/auth';
// PARA USAR EL BOTON
// TODO MANROMERO https://github.com/react-native-google-signin/google-signin#2-googlesigninbutton
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '671886777936-ovfo24tj20cnrqq7ri4scunidukdvn9g.apps.googleusercontent.com',
});

function App() {
  function onAuthStateChanged(user) {
    console.log('user', user);
    // setUser(user);
    // if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const onGoogleButtonPress = async () => {
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
    <Button
      title="Google Sign-In"
      onPress={() =>
        onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
      }
    />
  );
}

export default App;
