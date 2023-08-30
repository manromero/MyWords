// react
import {createContext} from 'react';

// firebase-auth
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

type ContextProps = {
  user: FirebaseAuthTypes.User | null;
  signOut: () => void;
};

export const AuthContext = createContext({} as ContextProps);
