import React from 'react';

import {StyleSheet, View} from 'react-native';
import {MWTag} from './MWTag';
import {TTag} from '../../types';

type TMWTag = {
  tags: TTag[];
};

export const MWTagsPreview = (props: TMWTag): JSX.Element => {
  return (
    <View style={styles.root}>
      {props.tags.map(t => {
        return (
          <MWTag
            key={t.id}
            label={t.label as string}
            labelColor={t.labelColor as string}
            backgroundColor={t.backgroundColor as string}
            borderColor={t.borderColor as string}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    gap: 7,
    flexWrap: 'wrap',
  },
});
