// react
import {useState, useEffect, useContext} from 'react';

// firestore
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

// types
import {TWord} from '../types';

// context
import {AuthContext} from '../context';

// utils
import {showToast} from '../utils';

export type TUseWordsResponse = {
  data: TWord[];
  loading: boolean;
  error: boolean;
};

export const useWords = (): TUseWordsResponse => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<TWord[]>([]);
  const {user} = useContext(AuthContext);

  const handleOnSnapShotResults = (
    query: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
  ) => {
    setLoading(false);
    setError(false);
    const words = query.docs.map(doc => {
      return {id: doc.id, ...doc.data()};
    });
    setData(words);
  };

  const handleOnSnapShotError = () => {
    setLoading(false);
    setError(true);
    showToast({
      type: 'error',
      text1: 'Error when retrieving the words',
    });
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setError(false);
      setData([]);
      return;
    }
    setLoading(true);
    const subscriber = firestore()
      .collection('words')
      .where('userId', '==', user.uid)
      .onSnapshot(handleOnSnapShotResults, handleOnSnapShotError);
    return () => subscriber();
  }, [user]);

  return {data, error, loading};
};
