// vendors
import React, {useContext, useEffect} from 'react';

// context
import {AuthContext} from '../context';

// Navigation
import {Navigation} from '../routes/Navigation';

// screens
import {Login} from './Login';
import {firebase} from '@react-native-firebase/database';

export const Main = (): JSX.Element => {
  const {user} = useContext(AuthContext);

  // TODO MANROMERO ELIMINAR, es solo un ejemplo
  useEffect(() => {
    console.log('iniciando conexión con bbdd');
    console.log('uid', user?.uid);
    if (!user?.uid) {
      return;
    }
    console.log(
      '-------------------------------------------------------------',
    );
    firebase
      .app()
      .database(
        'https://mywords-4d432-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref(`/users/${user?.uid}`)
      .push()
      .set({
        name: 'Ada Lovelace',
        age: 31,
        car: {
          modelo: 'coche',
          altura: 25,
        },
      })
      .then(() => console.log('Data set.'))
      .catch(e => console.log('e', e));
    firebase
      .app()
      .database(
        'https://mywords-4d432-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref(`/users/${user?.uid}`)
      .once('value')
      .then(snapshot => {
        console.log('User data: ', snapshot.val());
      });
  }, [user?.uid]);
  if (!user) {
    return <Login />;
  }
  return <Navigation />;
};
