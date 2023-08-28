// react
import {useState, useEffect, useContext} from 'react';

// firestore
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

// toast
import Toast from 'react-native-toast-message';

// types
import {TTag} from '../types';

// context
import {AuthContext} from '../context';

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

  const handleOnSnapShotError = () => {
    setLoading(false);
    setError(true);
    Toast.show({
      type: 'error',
      text1: 'Error when retrieving the tags',
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
      .collection('tags')
      .where('userId', '==', user.uid)
      .onSnapshot(handleOnSnapShotResults, handleOnSnapShotError);
    return () => subscriber();
  }, [user]);

  return {data, error, loading};
};
