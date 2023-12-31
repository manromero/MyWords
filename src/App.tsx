// react
import React from 'react';

// react-native-gesture-handler
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// react-native
import {SafeAreaView, StyleSheet} from 'react-native';

// context
import {AuthProvider, DataProvider, ThemeProvider} from './context';

// screens
import {Main} from './screens';

// inner components
import {MWToast} from './components';

function App(): JSX.Element {
  return (
    <>
      <SafeAreaView style={styles.root}>
        <GestureHandlerRootView style={styles.gestureHandlerView}>
          <AuthProvider>
            <DataProvider>
              <ThemeProvider>
                <Main />
                <MWToast />
              </ThemeProvider>
            </DataProvider>
          </AuthProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </>
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
