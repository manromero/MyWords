/* eslint-disable react/no-unstable-nested-components */
// vendors
import React from 'react';

// navigation components
import {NavigationContainer} from '@react-navigation/native';

// screens
import {
  Preferences,
  Settings,
  TagCreation,
  TagEdition,
  TagList,
  WordCarousel,
  WordCreation,
  WordEdition,
  WordList,
} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {useTheme} from '../hooks';

const Tab = createBottomTabNavigator();

const SettingsStack = createStackNavigator();

const SettingStackScreen = () => {
  const theme = useTheme();
  return (
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: 'Settings',
          headerTintColor: theme.COLORS.TEXT.PRIMARY,
          headerStyle: {
            backgroundColor: theme.COLORS.BG.PRIMARY,
          },
        }}
      />
      <SettingsStack.Screen
        name="Words"
        component={WordList}
        options={{
          headerTitle: 'Words',
          headerTintColor: theme.COLORS.TEXT.PRIMARY,
          headerStyle: {
            backgroundColor: theme.COLORS.BG.PRIMARY,
          },
        }}
      />
      <SettingsStack.Screen
        name="Word Edition"
        component={WordEdition}
        options={{
          headerTitle: 'Word Edition',
          headerTintColor: theme.COLORS.TEXT.PRIMARY,
          headerStyle: {
            backgroundColor: theme.COLORS.BG.PRIMARY,
          },
        }}
      />
      <SettingsStack.Screen
        name="Tags"
        component={TagList}
        options={{
          headerTitle: 'Tags',
          headerTintColor: theme.COLORS.TEXT.PRIMARY,
          headerStyle: {
            backgroundColor: theme.COLORS.BG.PRIMARY,
          },
        }}
      />
      <SettingsStack.Screen
        name="Tag Creation"
        component={TagCreation}
        options={{
          headerTitle: 'Tag Creation',
          headerTintColor: theme.COLORS.TEXT.PRIMARY,
          headerStyle: {
            backgroundColor: theme.COLORS.BG.PRIMARY,
          },
        }}
      />
      <SettingsStack.Screen
        name="Tag Edition"
        component={TagEdition}
        options={{
          headerTitle: 'Tag Edition',
          headerTintColor: theme.COLORS.TEXT.PRIMARY,
          headerStyle: {
            backgroundColor: theme.COLORS.BG.PRIMARY,
          },
        }}
      />
      <SettingsStack.Screen
        name="Preferences"
        component={Preferences}
        options={{
          headerTitle: 'Preferences',
          headerTintColor: theme.COLORS.TEXT.PRIMARY,
          headerStyle: {
            backgroundColor: theme.COLORS.BG.PRIMARY,
          },
        }}
      />
    </SettingsStack.Navigator>
  );
};

export const Navigation = (): JSX.Element => {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Settings">
        <Tab.Screen
          name="Words Carousel"
          component={WordCarousel}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color, size}) => (
              <Icon name={'view-carousel'} size={size} color={color} />
            ),
            tabBarActiveTintColor: theme.COLORS.FOOTER.ITEM_ACTIVE,
            tabBarInactiveTintColor: theme.COLORS.FOOTER.ITEM_INACTIVE,
            tabBarStyle: {
              backgroundColor: theme.COLORS.BG.PRIMARY,
              borderColor: theme.COLORS.BG.PRIMARY,
            },
          }}
        />
        <Tab.Screen
          name="Words Creation"
          component={WordCreation}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color, size}) => (
              <Icon name={'playlist-add'} size={size} color={color} />
            ),
            tabBarActiveTintColor: theme.COLORS.FOOTER.ITEM_ACTIVE,
            tabBarInactiveTintColor: theme.COLORS.FOOTER.ITEM_INACTIVE,
            tabBarStyle: {
              backgroundColor: theme.COLORS.BG.PRIMARY,
              borderColor: theme.COLORS.BG.PRIMARY,
            },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingStackScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color, size}) => (
              <Icon name={'settings'} size={size} color={color} />
            ),
            tabBarActiveTintColor: theme.COLORS.FOOTER.ITEM_ACTIVE,
            tabBarInactiveTintColor: theme.COLORS.FOOTER.ITEM_INACTIVE,
            tabBarStyle: {
              backgroundColor: theme.COLORS.BG.PRIMARY,
              borderColor: theme.COLORS.BG.PRIMARY,
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
