import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';

import {Theme} from '../../theme';

import Icon from 'react-native-vector-icons/MaterialIcons';

type TOption = {
  label: string;
  value: string;
  selected?: boolean;
};

type TMWPicker = {
  buttonLabel: string;
  filterPlaceholder?: string;
  options: TOption[];
  onOptionChange: (option: TOption) => void;
};

export const MWPicker = ({
  filterPlaceholder = 'Filter Elements',
  ...props
}: TMWPicker): JSX.Element => {
  const [options, setOptions] = useState<TOption[]>(props.options);
  const [filter, setFilter] = useState('');
  const [inputActive, setInputActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  const handleOnPress = (optionValue: string) => {
    let optionUdapted;
    const newOptions = options.map(option => {
      const copyOption = {...option};
      if (copyOption.value === optionValue) {
        copyOption.selected = !copyOption.selected;
        optionUdapted = {...copyOption};
      }
      return copyOption;
    });
    setOptions(newOptions);
    if (optionUdapted) {
      props.onOptionChange(optionUdapted);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.openModalButton}
        onPress={() => setShowModal(true)}>
        <Text style={styles.openModalButtonText}>{props.buttonLabel}</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton}>
              <Icon
                name={'close'}
                size={25}
                color={Theme.COLORS.ICONS.PRIMARY}
                onPress={() => setShowModal(false)}
              />
            </TouchableOpacity>
            <TextInput
              onFocus={() => setInputActive(true)}
              onBlur={() => setInputActive(false)}
              style={inputStyles({active: inputActive}).input}
              placeholder={filterPlaceholder}
              value={filter}
              onChangeText={newFilter => setFilter(newFilter)}
            />
            <FlatList
              data={options.filter(option => option.label.includes(filter))}
              renderItem={({item}) => (
                <Item {...item} onPress={handleOnPress} />
              )}
              keyExtractor={item => item.value}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  openModalButton: {
    backgroundColor: Theme.COLORS.BG.ACTION_PRIMARY,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  openModalButtonText: {
    color: Theme.COLORS.TEXT.ACTION_PRIMARY,
    fontWeight: '700',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    margin: 20,
    maxHeight: Dimensions.get('screen').height * 0.7,
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
    marginLeft: 5,
    marginRight: 5,
  },
});

const Item = (
  props: TOption & {onPress: (optionValue: string) => void},
): JSX.Element => {
  const itemStyles = getItemStyles(props.selected);
  return (
    <TouchableOpacity
      style={itemStyles.root}
      onPress={() => props.onPress(props.value)}>
      <Text style={itemStyles.label}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const getItemStyles = (selected?: boolean) =>
  StyleSheet.create({
    root: {
      flex: 1,
      padding: 10,
      margin: 5,
      backgroundColor: selected
        ? Theme.COLORS.BG.PICKER_OPTION_SELECTED
        : Theme.COLORS.BG.SECONDARY,
      display: 'flex',
      justifyContent: 'center',
      borderRadius: 5,
      shadowColor: Theme.COLORS.SHADOW.PRIMARY,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 1,
    },
    label: {
      fontSize: 15,
      fontWeight: selected ? '700' : '400',
      color: Theme.COLORS.TEXT.PRIMARY,
    },
  });

const inputStyles = ({active}: {active?: boolean}) =>
  StyleSheet.create({
    input: {
      borderBottomColor: Theme.COLORS.BORDER.PRIMARY,
      borderBottomWidth: active ? 3 : 1,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 10,
    },
  });
