// react
import React, {useState, useEffect} from 'react';

// context
import {AuthContext} from './AuthContext';

// firebase-auth
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

// utils
import {showToast} from '../../utils';

type TAuthProvider = {
  children: React.ReactNode;
};

export const AuthProvider = ({children}: TAuthProvider): JSX.Element => {
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  const onAuthStateChanged = (_user: FirebaseAuthTypes.User | null) => {
    setUser(_user);
    setInitialized(true);
  };

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() =>
        showToast({
          type: 'success',
          text1: 'Log out successfully',
        }),
      )
      .catch(() =>
        showToast({
          type: 'error',
          text1: 'Unexpected error loging out',
        }),
      );
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <AuthContext.Provider value={{user, initialized, signOut: handleSignOut}}>
      {children}
    </AuthContext.Provider>
  );
};
