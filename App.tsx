// vendors
import React from 'react';

// react-native components
import {SafeAreaView, StyleSheet} from 'react-native';

// components
import {Card} from './Card';

import words from './words.json';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.root}>
      <Card {...words[0]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#575757',
    flex: 1,
  },
});

export default App;
