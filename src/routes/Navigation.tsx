/* eslint-disable react/no-unstable-nested-components */
// vendors
import React from 'react';

// navigation components
import {NavigationContainer} from '@react-navigation/native';

// screens
import {
  Settings,
  TagCreation,
  TagList,
  WordCarousel,
  WordCreation,
  WordEdition,
  WordList,
} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const SettingsStack = createStackNavigator();

const SettingStackScreen = () => {
  return (
    <SettingsStack.Navigator initialRouteName="Tags Creation">
      <SettingsStack.Screen name="Settings" component={Settings} />
      <SettingsStack.Screen name="Words" component={WordList} />
      <SettingsStack.Screen name="Word Edition" component={WordEdition} />
      <SettingsStack.Screen name="Tags" component={TagList} />
      <SettingsStack.Screen name="Tags Creation" component={TagCreation} />
    </SettingsStack.Navigator>
  );
};

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
          component={SettingStackScreen}
          options={{
            headerShown: false,
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
