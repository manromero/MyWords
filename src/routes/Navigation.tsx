// vendors
import React from 'react';

// navigation components
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

// screens
import {
  TagCreation,
  WordCarousel,
  WordCreation,
  WordEdition,
  WordList,
} from '../screens';

const Drawer = createDrawerNavigator();

export const Navigation = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Create Tag">
        <Drawer.Screen name="Carouosel Words" component={WordCarousel} />
        <Drawer.Screen name="List Word" component={WordList} />
        <Drawer.Screen name="Create Word" component={WordCreation} />
        <Drawer.Screen name="Edit Word" component={WordEdition} />
        <Drawer.Screen name="Create Tag" component={TagCreation} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
