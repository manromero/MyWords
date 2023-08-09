// vendors
import React from 'react';

// navigation components
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

// screens
import {WordCarousel, WordCreation} from '../screens';

const Drawer = createDrawerNavigator();

export const Navigation = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="List Words">
        <Drawer.Screen name="List Words" component={WordCarousel} />
        <Drawer.Screen name="Create Word" component={WordCreation} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
