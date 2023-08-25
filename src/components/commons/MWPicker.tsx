import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {Theme} from '../../theme';

import {MWModal} from './MWModal';

type TOption = {
  label: string;
  value: string;
  selected?: boolean;
};

type TMWPicker = {
  buttonLabel: string;
  filterPlaceholder?: string;
  options: TOption[];
  onOptionPress: (value: string) => void;
};

export const MWPicker = ({
  filterPlaceholder = 'Filter Elements',
  ...props
}: TMWPicker): JSX.Element => {
  const [filter, setFilter] = useState('');
  const [inputActive, setInputActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleOnPress = (value: string) => {
    props.onOptionPress(value);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.openModalButton}
        onPress={() => setShowModal(true)}>
        <Text style={styles.openModalButtonText}>{props.buttonLabel}</Text>
      </TouchableOpacity>
      <MWModal open={showModal} onClose={() => setShowModal(false)}>
        <TextInput
          onFocus={() => setInputActive(true)}
          onBlur={() => setInputActive(false)}
          style={inputStyles({active: inputActive}).input}
          placeholder={filterPlaceholder}
          value={filter}
          onChangeText={newFilter => setFilter(newFilter)}
        />
        <FlatList
          data={props.options.filter(option => option.label.includes(filter))}
          renderItem={({item}) => <Item {...item} onPress={handleOnPress} />}
          keyExtractor={item => item.value}
        />
      </MWModal>
    </View>
  );
};

const styles = StyleSheet.create({
  openModalButton: {
    backgroundColor: Theme.COLORS.BG.ACTION_PRIMARY,
    display: 'flex',
    alignItems: 'center',
    padding_top: 5,
    padding_bottom: 5,
  },
  openModalButtonText: {
    alignSelf: 'flex-start',
    color: Theme.COLORS.TEXT.ACTION_PRIMARY,
    fontWeight: '700',
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
      color: Theme.COLORS.TEXT.PRIMARY,
    },
  });
