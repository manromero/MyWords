// vendors
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// react-native components
import {SafeAreaView, StyleSheet, Dimensions} from 'react-native';

// components

import words from './words.json';
import Carousel from 'react-native-reanimated-carousel';
import {WordEdition} from './components/word/WordEdition';
import {WordPreview} from './components/word/wordPreview';

function App(): JSX.Element {
  const windowWidth = Dimensions.get('window').width;
  return (
    <SafeAreaView style={styles.root}>
      <GestureHandlerRootView style={styles.gestureHandlerView}>
        {/* <Carousel
          style={styles.carousel}
          loop
          width={windowWidth}
          data={words}
          scrollAnimationDuration={400}
          onSnapToItem={index => console.log('current index:', index)}
          renderItem={({item}) => <WordPreview key={item.word} {...item} />}
        /> */}
        <WordEdition />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#575757',
    flex: 1,
  },
  gestureHandlerView: {
    flex: 1,
  },
  carousel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
