// react
import {useState, useEffect, useContext, useCallback} from 'react';

// firestore
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

// context
import {AuthContext} from '../context';

// types
import {TPreferences} from '../types/preferences';

// hooks
import {useToast} from './useToast';

export type TUsePreferencesResponse = {
  data: TPreferences;
  loading: boolean;
  error: boolean;
};

const DEFAULT_PREFERENCES: TPreferences = {
  theme: 'automatic',
};

export const usePreferences = (): TUsePreferencesResponse => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<TPreferences>(DEFAULT_PREFERENCES);
  const {user} = useContext(AuthContext);
  const {showToast} = useToast();

  const handleOnSnapShotResults = (
    query: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
  ) => {
    setLoading(false);
    setError(false);
    let _data = DEFAULT_PREFERENCES;
    if (query.docs.length > 0) {
      _data = {id: query.docs[0].id, ...query.docs[0].data()};
    }
    setData(_data);
  };

  const handleOnSnapShotError = useCallback(() => {
    setLoading(false);
    setError(true);
    showToast({
      type: 'error',
      text1: 'Error when retrieving the words',
    });
  }, [showToast]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setError(false);
      setData(DEFAULT_PREFERENCES);
      return;
    }
    setLoading(true);
    const subscriber = firestore()
      .collection('preferences')
      .where('userId', '==', user.uid)
      .onSnapshot(handleOnSnapShotResults, handleOnSnapShotError);
    return () => subscriber();
  }, [user, handleOnSnapShotError]);

  return {data, error, loading};
};
