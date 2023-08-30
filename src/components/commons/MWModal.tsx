// react
import React from 'react';

// react-native
import {StyleSheet, View, Modal, TouchableOpacity} from 'react-native';

// icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// hooks
import {useTheme} from '../../hooks';

// types
import {TTheme} from '../../types';

type TMWModal = {
  open?: boolean;
  onClose?: () => void;
};

export const MWModal = (
  props: React.PropsWithChildren<TMWModal>,
): JSX.Element => {
  const {theme} = useTheme();
  const styles = getStyles(theme);
  return (
    <Modal animationType="none" transparent={true} visible={props.open}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={props.onClose}>
            <Icon
              name={'close'}
              size={20}
              color={theme.COLORS.STATUS.DEFAULT}
            />
          </TouchableOpacity>
          {props.children}
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (theme: TTheme) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.COLORS.BG.MODAL,
    },
    modalView: {
      width: '70%',
      margin: 20,
      backgroundColor: theme.COLORS.BG.SECONDARY,
      borderRadius: 20,
      padding: 20,
      elevation: 1,
      gap: 10,
    },
    closeButton: {
      padding: 5,
      alignSelf: 'flex-end',
    },
  });
