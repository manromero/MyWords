// toast
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export const showToast = ({
  type,
  text1,
  text2,
}: {
  type?: string;
  text1: string;
  text2?: string;
}) => {
  Toast.show({
    type,
    text1,
    text2,
    visibilityTime: 1500,
  });
};
