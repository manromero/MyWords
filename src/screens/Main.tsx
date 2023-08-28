// react
import React from 'react';

// inner components
import {Navigation} from '../routes/Navigation';

// screens
import {Login} from './Login';

// hooks
import {useAuth} from '../hooks';

export const Main = (): JSX.Element => {
  const {user} = useAuth();

  if (!user) {
    return <Login />;
  }
  return <Navigation />;
};
