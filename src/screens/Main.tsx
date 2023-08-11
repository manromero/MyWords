// vendors
import React, {useContext} from 'react';

// context
import {AuthContext} from '../context';

// Navigation
import {Navigation} from '../routes/Navigation';

// screens
import {Login} from './Login';

export const Main = (): JSX.Element => {
  const {user} = useContext(AuthContext);

  if (!user) {
    return <Login />;
  }
  return <Navigation />;
};
