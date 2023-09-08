// react
import React, {useEffect, useCallback} from 'react';

// inner components
import {Navigation} from '../routes/Navigation';

// screens
import {Login} from './Login';

// hooks
import {useAuth, useData} from '../hooks';
import SplashScreen from 'react-native-splash-screen';

export const Main = (): JSX.Element => {
  const {user, initialized: authInitialized} = useAuth();
  const {
    preferences: {loadUserPreferences},
  } = useData();

  const loadPreferences = useCallback(
    async (userId: string) => {
      await loadUserPreferences(userId);
      SplashScreen.hide();
    },
    [loadUserPreferences],
  );

  useEffect(() => {
    if (authInitialized) {
      if (user?.uid) {
        loadPreferences(user.uid);
      } else {
        SplashScreen.hide();
      }
    }
  }, [authInitialized, user, loadPreferences]);

  if (!user) {
    return <Login />;
  }
  return <Navigation />;
};
