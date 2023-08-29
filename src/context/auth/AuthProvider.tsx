import React, {useState, useEffect} from 'react';
import {AuthContext} from './AuthContext';

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

type TAuthProvider = {
  children: React.ReactNode;
};

export const AuthProvider = ({children}: TAuthProvider): JSX.Element => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  const onAuthStateChanged = (_user: FirebaseAuthTypes.User | null) => {
    setUser(_user);
  };

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <AuthContext.Provider value={{user, signOut: handleSignOut}}>
      {children}
    </AuthContext.Provider>
  );
};
