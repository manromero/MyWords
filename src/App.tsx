// vendors
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// react-native components
import {SafeAreaView, StyleSheet} from 'react-native';

// providers
import {AuthProvider} from './context';

// Main
import {Main} from './screens';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.root}>
      <GestureHandlerRootView style={styles.gestureHandlerView}>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  gestureHandlerView: {
    flex: 1,
  },
});

export default App;