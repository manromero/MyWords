import React from 'react';

import {StyleSheet, View, Modal, TouchableOpacity} from 'react-native';

type TMWModal = {
  open?: boolean;
  onClose?: () => void;
};

import {Theme} from '../../theme';

import Icon from 'react-native-vector-icons/MaterialIcons';

export const MWModal = (
  props: React.PropsWithChildren<TMWModal>,
): JSX.Element => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.open}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={props.onClose}>
            <Icon name={'close'} size={20} color={Theme.COLORS.ICONS.PRIMARY} />
          </TouchableOpacity>
          {props.children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '70%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: Theme.COLORS.SHADOW.PRIMARY,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 10,
  },
  closeButton: {
    padding: 5,
    alignSelf: 'flex-end',
  },
});