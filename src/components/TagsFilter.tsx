import React, {useContext, useEffect, useState} from 'react';

import {StyleSheet, TouchableOpacity, Text} from 'react-native';

// theme
import {Theme} from '../theme';
import {MWModal, MWPicker} from './commons';

import {TTag} from '../types';
import {DataContext} from '../context';
import {TagsPreview} from './tag/TagsPreview';

type TFilter = {
  tags: string[];
};

type TTagsFilter = {
  open?: boolean;
  onClose?: () => void;
  onFilter?: (filter: TFilter) => void;
};

type TTagForSelection = TTag & {selected?: boolean};

export const TagsFilter = (props: TTagsFilter): JSX.Element => {
  const {tags: allTags} = useContext(DataContext);
  const [tags, setTags] = useState<TTagForSelection[]>([]);

  useEffect(() => {
    setTags(prevTags => {
      const _tags = allTags.data.map(dt => {
        const selected = prevTags.some(pt => pt.selected && pt.id === dt.id);
        return {...dt, selected};
      });
      return _tags;
    });
  }, [allTags]);

  const handleOnFilter = () => {
    const filteredTags = tags.filter(t => t.selected).map(t => t.id as string);
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
        onOptionPress={value => {
          setTags(prevTags => {
            return prevTags.map(pT => {
              const _tag = {...pT};
              if (_tag.id === value) {
                _tag.selected = !_tag.selected;
              }
              return _tag;
            });
          });
        }}
      />
      <TagsPreview
        tags={tags.filter(t => t.selected)}
        noTagsText="No tag selected"
      />
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
    elevation: 1,
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
