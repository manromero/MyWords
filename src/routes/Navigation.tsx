/* eslint-disable react/no-unstable-nested-components */
// vendors
import React from 'react';

// navigation components
import {NavigationContainer} from '@react-navigation/native';

// screens
import {Settings, WordCarousel, WordCreation} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export const Navigation = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Settings">
        <Tab.Screen
          name="Words Carousel"
          component={WordCarousel}
          options={{
            tabBarLabel: 'Learn',
            tabBarIcon: ({color, size}) => (
              <Icon name={'view-carousel'} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Words Creation"
          component={WordCreation}
          options={{
            tabBarLabel: 'New Word',
            tabBarIcon: ({color, size}) => (
              <Icon name={'playlist-add'} size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({color, size}) => (
              <Icon name={'settings'} size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
