// react
import {useState, useEffect, useContext, useCallback} from 'react';

// firestore
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

// types
import {TTag} from '../types';

// context
import {AuthContext} from '../context';

// hooks
import {useToast} from './useToast';

export type TUseTagsResponse = {
  data: TTag[];
  loading: boolean;
  error: boolean;
};

export const useTags = (): TUseTagsResponse => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<TTag[]>([]);
  const {user} = useContext(AuthContext);
  const {showToast} = useToast();

  const handleOnSnapShotResults = (
    query: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
  ) => {
    setLoading(false);
    setError(false);
    const tags = query.docs.map(doc => {
      return {id: doc.id, ...doc.data()};
    });
    setData(tags);
  };

  const handleOnSnapShotError = useCallback(() => {
    setLoading(false);
    setError(true);
    showToast({
      type: 'error',
      text1: 'Error when retrieving the tags',
    });
  }, [showToast]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setError(false);
      setData([]);
      return;
    }
    setLoading(true);
    const subscriber = firestore()
      .collection('tags')
      .where('userId', '==', user.uid)
      .onSnapshot(handleOnSnapShotResults, handleOnSnapShotError);
    return () => subscriber();
  }, [user, handleOnSnapShotError]);

  return {data, error, loading};
};
