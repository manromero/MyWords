import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {MWModal} from './MWModal';
import {useTheme} from '../../hooks';
import {TTheme} from '../../theme';

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
  const theme = useTheme();

  const [filter, setFilter] = useState('');
  const [inputActive, setInputActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleOnPress = (value: string) => {
    props.onOptionPress(value);
  };

  const styles = getStyles(theme);

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
          style={inputStyles({active: inputActive, theme}).input}
          placeholder={filterPlaceholder}
          value={filter}
          onChangeText={newFilter => setFilter(newFilter)}
          placeholderTextColor={theme.COLORS.INPUT.PLACEHOLDER}
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

const getStyles = (theme: TTheme) =>
  StyleSheet.create({
    openModalButton: {
      display: 'flex',
      alignItems: 'center',
      padding_top: 5,
      padding_bottom: 5,
    },
    openModalButtonText: {
      alignSelf: 'flex-start',
      color: theme.COLORS.STATUS.ACTIVE,
      fontWeight: '700',
    },
  });

const Item = (
  props: TOption & {onPress: (optionValue: string) => void},
): JSX.Element => {
  const theme = useTheme();
  const itemStyles = getItemStyles({selected: props.selected, theme});
  return (
    <TouchableOpacity
      style={itemStyles.root}
      onPress={() => props.onPress(props.value)}>
      <Text style={itemStyles.label}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const getItemStyles = ({
  selected,
  theme,
}: {
  selected?: boolean;
  theme: TTheme;
}) =>
  StyleSheet.create({
    root: {
      flex: 1,
      padding: 10,
      margin: 5,
      backgroundColor: selected
        ? theme.COLORS.PICKER.ITEM_BG_SELECTED
        : theme.COLORS.PICKER.ITEM_BG_UNSELECTED,
      display: 'flex',
      justifyContent: 'center',
      borderRadius: 5,
      elevation: 1,
    },
    label: {
      fontSize: 15,
      fontWeight: selected ? '700' : '400',
      color: selected
        ? theme.COLORS.PICKER.ITEM_LABEL_SELECTED
        : theme.COLORS.PICKER.ITEM_LABEL_UNSELECTED,
    },
  });

const inputStyles = ({active, theme}: {active?: boolean; theme: TTheme}) =>
  StyleSheet.create({
    input: {
      borderBottomColor: active
        ? theme.COLORS.INPUT.BORDER_ACTIVE
        : theme.COLORS.INPUT.BORDER_INACTIVE,
      borderBottomWidth: active ? 2 : 1,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 10,
      color: theme.COLORS.INPUT.COLOR,
    },
  });
