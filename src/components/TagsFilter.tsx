import React, {useEffect, useState} from 'react';

import {StyleSheet, TouchableOpacity, Text} from 'react-native';

// theme
import {Theme} from '../theme';
import {MWModal, MWPicker, MWTagsPreview} from './commons';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

// firestore
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {TTag} from '../types';

type TFilter = {
  tags: TTag[];
};

type TTagsFilter = {
  open?: boolean;
  onClose?: () => void;
  onFilter?: (filter: TFilter) => void;
};

type TTagForSelection = TTag & {selected?: boolean};

export const TagsFilter = (props: TTagsFilter): JSX.Element => {
  const [tags, setTags] = useState<TTagForSelection[]>([]);

  const handleOnSnapShotResults = (
    query: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
  ) => {
    setTags(prevTags => {
      const _tags = query.docs.map(dt => {
        const selected = prevTags.some(pt => pt.selected && pt.id === dt.id);
        return {id: dt.id, ...dt.data(), selected};
      });
      return _tags;
    });
  };

  const handleOnSnapShotError = () => {
    Toast.show({
      type: 'error',
      text1: 'Error when retrieving the tags',
    });
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('tags')
      .onSnapshot(handleOnSnapShotResults, handleOnSnapShotError);
    return () => subscriber();
  }, []);

  const handleOnFilter = () => {
    const filteredTags = tags
      .filter(t => t.selected)
      .map(t => ({
        id: t.id,
        label: t.label,
        labelColor: t.label,
        backgroundColor: t.backgroundColor,
        borderColor: t.borderColor,
      }));
    props.onFilter?.({tags: filteredTags});
  };

  return (
    <MWModal open={props.open} onClose={props.onClose}>
      <MWPicker
        buttonLabel={'Update tags to filter'}
        options={tags.map(t => ({
          label: t.label as string,
          value: t.id as string,
          selected: t.selected,
        }))}
        onOptionChange={option => {
          setTags(prevTags => {
            return prevTags.map(pT => {
              const _tag = {...pT};
              if (_tag.id === option.value) {
                _tag.selected = option.selected;
              }
              return _tag;
            });
          });
        }}
      />
      <MWTagsPreview tags={tags.filter(t => t.selected)} />
      <TouchableOpacity style={styles.filterButton} onPress={handleOnFilter}>
        <Text style={styles.filterButtonText}>FILTER</Text>
      </TouchableOpacity>
    </MWModal>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Theme.COLORS.BG.SECONDARY,
    margin: 20,
    borderRadius: 30,
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    shadowColor: Theme.COLORS.SHADOW.PRIMARY,
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  filterButton: {
    backgroundColor: Theme.COLORS.BG.ACTION_PRIMARY,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    color: Theme.COLORS.TEXT.ACTION_PRIMARY,
    fontWeight: '700',
  },
});
