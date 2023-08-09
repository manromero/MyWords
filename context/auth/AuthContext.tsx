import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {createContext} from 'react';

type ContextProps = {
  user: FirebaseAuthTypes.User | null;
  signOut: () => void;
};

export const AuthContext = createContext({} as ContextProps);
