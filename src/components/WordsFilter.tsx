// react
import React, {useEffect, useState} from 'react';

// react-native
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

// inner components
import {MWModal, MWPicker, MWRadioButton} from './commons';
import {TagsPreview} from './tag/TagsPreview';

// types
import {TTag, TTheme, TWordsFilter, TWordsFilterLearned} from '../types';

// hooks
import {useData, useTheme} from '../hooks';

type TWordsFilterComponent = {
  open?: boolean;
  onClose?: () => void;
  onFilter?: (filter: TWordsFilter) => void;
};

type TTagForSelection = TTag & {selected?: boolean};

export const WordsFilter = (props: TWordsFilterComponent): JSX.Element => {
  const {tags: allTags} = useData();
  const [tags, setTags] = useState<TTagForSelection[]>([]);
  const [learnedFilter, setLearnedFilter] = useState<TWordsFilterLearned>(
    TWordsFilterLearned.NOT_LEARNED,
  );

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
    props.onFilter?.({tags: filteredTags, learnedFilter});
  };

  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <MWModal open={props.open} onClose={props.onClose}>
      <View style={styles.root}>
        <View style={styles.learnedContainer}>
          <Text style={styles.learnedLabel}>Select theme:</Text>
          <MWRadioButton
            label="Not learned"
            selected={learnedFilter === TWordsFilterLearned.NOT_LEARNED}
            onPress={selected =>
              selected && setLearnedFilter(TWordsFilterLearned.NOT_LEARNED)
            }
          />
          <MWRadioButton
            label="Learned"
            selected={learnedFilter === TWordsFilterLearned.LEARNED}
            onPress={selected =>
              selected && setLearnedFilter(TWordsFilterLearned.LEARNED)
            }
          />
          <MWRadioButton
            label="All"
            selected={learnedFilter === TWordsFilterLearned.ALL}
            onPress={selected =>
              selected && setLearnedFilter(TWordsFilterLearned.ALL)
            }
          />
        </View>
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
      </View>
    </MWModal>
  );
};

const getStyles = (theme: TTheme) =>
  StyleSheet.create({
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: 15,
    },
    learnedContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    },
    learnedLabel: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.COLORS.RADIO_BUTTON.LABEL,
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
