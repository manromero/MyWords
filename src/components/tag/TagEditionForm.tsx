// react
import React, {useState} from 'react';

// react-native
import {StyleSheet, View, Text} from 'react-native';

// inner components
import {MWCard, MWTextInput, MWColorPicker, Tag} from '../../components';

// icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// firestore
import firestore from '@react-native-firebase/firestore';

// toast
import Toast from 'react-native-toast-message';

// types
import {TNavigatorSettingsStackParamList, TTag} from '../../types';
import {TTheme} from '../../theme';

// react-navigation
import {StackNavigationProp} from '@react-navigation/stack';

// hooks
import {useAuth, useTheme} from '../../hooks';

// routes
import {routes} from '../../routes';

type TTagEditionForm = TTag & {
  navigation: StackNavigationProp<
    TNavigatorSettingsStackParamList,
    routes.SCREEN_TAG_EDITION
  >;
};

export const TagEditionForm = (props: TTagEditionForm): JSX.Element => {
  const {user} = useAuth();
  const {theme} = useTheme();
  const [id, setId] = useState(props.id);
  const [label, setLabel] = useState(props.label);
  const [labelColor, setLabelColor] = useState(
    props.labelColor ?? theme.COLORS.TAG.DEFAULT_LABEL,
  );
  const [backgroundColor, setBackgroundColor] = useState(
    props.backgroundColor ?? theme.COLORS.TAG.DEFAULT_BG,
  );
  const [borderColor, setBorderColor] = useState(
    props.borderColor ?? theme.COLORS.TAG.DEFAULT_BORDER,
  );
  const styles = getStyles(theme);

  const handleOnSave = () => {
    const collection = firestore().collection('tags');
    const tagDTO = {
      label,
      labelColor,
      backgroundColor,
      borderColor,
      userId: user?.uid,
    };
    if (id) {
      collection
        .doc(id)
        .update(tagDTO)
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Tag updated',
          });
          props.navigation.goBack();
        })
        .catch(() => {
          Toast.show({
            type: 'error',
            text1: 'Error when updating the tag',
          });
        });
    } else {
      collection
        .add(tagDTO)
        .then(dataSaved => {
          setId(dataSaved.id);
          Toast.show({
            type: 'success',
            text1: 'Tag created',
          });
          props.navigation.goBack();
        })
        .catch(() => {
          Toast.show({
            type: 'error',
            text1: 'Error when creating the tag',
          });
        });
    }
  };

  const handleOnDelete = () => {
    const collection = firestore().collection('tags');
    collection
      .doc(id)
      .delete()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Tag deleted',
        });
        props.navigation.goBack();
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Error when deleting the word',
        });
      });
  };

  const disabled = !label || !labelColor || !backgroundColor || !borderColor;

  return (
    <MWCard>
      <MWTextInput
        label="Tag label:"
        placeholder="Insert here the tag label"
        value={label}
        onChangeText={text => setLabel(text)}
      />
      <MWColorPicker
        label="Tag label color:"
        placeholder="Insert here the label color"
        value={labelColor}
        onChangeColor={text => setLabelColor(text)}
      />
      <MWColorPicker
        label="Tag background color:"
        placeholder="Insert here the background color"
        value={backgroundColor}
        onChangeColor={text => setBackgroundColor(text)}
      />
      <MWColorPicker
        label="Tag border color:"
        placeholder="Insert here the border color"
        value={borderColor}
        onChangeColor={text => setBorderColor(text)}
      />
      {label && (
        <View style={styles.previewWrapper}>
          <Text style={styles.previewLabel}>Preview:</Text>
          <Tag
            label={label}
            labelColor={labelColor}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
          />
        </View>
      )}
      <View style={styles.footer}>
        {id && (
          <Icon.Button
            name="delete"
            size={20}
            backgroundColor={theme.COLORS.ACTION_BUTTON.DELETE_ACTIVE_BG}
            color={theme.COLORS.ACTION_BUTTON.DELETE_ACTIVE_LABEL}
            onPress={handleOnDelete}>
            DELETE
          </Icon.Button>
        )}
        <Icon.Button
          name="save"
          size={20}
          backgroundColor={
            disabled
              ? theme.COLORS.ACTION_BUTTON.PRIMARY_DISABLED_BG
              : theme.COLORS.ACTION_BUTTON.PRIMARY_ACTIVE_BG
          }
          disabled={disabled}
          color={
            disabled
              ? theme.COLORS.ACTION_BUTTON.PRIMARY_DISABLED_LABEL
              : theme.COLORS.ACTION_BUTTON.PRIMARY_ACTIVE_LABEL
          }
          onPress={handleOnSave}>
          SAVE
        </Icon.Button>
      </View>
    </MWCard>
  );
};

const getStyles = (theme: TTheme) =>
  StyleSheet.create({
    previewWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    previewLabel: {
      fontSize: 15,
      fontWeight: '400',
      color: theme.COLORS.INPUT.LABEL,
    },
    footer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 10,
    },
  });
