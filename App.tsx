// vendors
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// react-native components
import {SafeAreaView, StyleSheet} from 'react-native';

// navigation components
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

// screens
import {WordCarousel, WordCreation} from './screens';

const Drawer = createDrawerNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.root}>
      <GestureHandlerRootView style={styles.gestureHandlerView}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="List Words">
            <Drawer.Screen name="List Words" component={WordCarousel} />
            <Drawer.Screen name="Create Word" component={WordCreation} />
          </Drawer.Navigator>
        </NavigationContainer>
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
