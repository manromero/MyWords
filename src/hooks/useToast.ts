// react
import {useCallback} from 'react';

// toast
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export const useToast = () => {
  const showToast = useCallback(
    ({type, text1, text2}: {type?: string; text1: string; text2?: string}) => {
      Toast.show({
        type,
        text1,
        text2,
        visibilityTime: 1500,
      });
    },
    [],
  );

  return {showToast};
};
