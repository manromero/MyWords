// vendors
import React from 'react';

// Navigation
import {Navigation} from '../routes/Navigation';

// screens
import {Login} from './Login';
import {useAuth} from '../hooks';

export const Main = (): JSX.Element => {
  const {user} = useAuth();

  if (!user) {
    return <Login />;
  }
  return <Navigation />;
};
