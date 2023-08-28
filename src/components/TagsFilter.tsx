import React, {useEffect, useState} from 'react';

import {StyleSheet, TouchableOpacity, Text} from 'react-native';

// theme
import {MWModal, MWPicker} from './commons';

import {TTag} from '../types';
import {TagsPreview} from './tag/TagsPreview';
import {useData, useTheme} from '../hooks';
import {TTheme} from '../theme';

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
  const {tags: allTags} = useData();
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

  const {theme} = useTheme();
  const styles = getStyles(theme);

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

const getStyles = (theme: TTheme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.COLORS.BG.SECONDARY,
      margin: 20,
      borderRadius: 30,
      padding: 30,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      elevation: 1,
    },
    filterButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterButtonText: {
      color: theme.COLORS.STATUS.ACTIVE,
      fontWeight: '700',
    },
  });
