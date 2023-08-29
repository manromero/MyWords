/* eslint-disable react/no-unstable-nested-components */
// react
import React from 'react';

// react-navigation
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

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

// icons
import Icon from 'react-native-vector-icons/MaterialIcons';

// hooks
import {useTheme} from '../hooks';
import {routes} from './routes';

const Tab = createBottomTabNavigator();

const SettingsStack = createStackNavigator();

const SettingStackScreen = () => {
  const {theme} = useTheme();
  return (
    <SettingsStack.Navigator initialRouteName={routes.SCREEN_SETTINGS.route}>
      <SettingsStack.Screen
        name={routes.SCREEN_SETTINGS.route}
        component={Settings}
        options={{
          headerTitle: routes.SCREEN_SETTINGS.title,
          headerTintColor: theme.COLORS.TEXT.PRIMARY,
          headerStyle: {
            backgroundColor: theme.COLORS.BG.PRIMARY,
          },
        }}
      />
      <SettingsStack.Screen
        name={routes.SCREEN_WORD_LIST.route}
        component={WordList}
        options={{
          headerTitle: routes.SCREEN_WORD_LIST.title,
          headerTintColor: theme.COLORS.TEXT.PRIMARY,
          headerStyle: {
            backgroundColor: theme.COLORS.BG.PRIMARY,
          },
        }}
      />
      <SettingsStack.Screen
        name={routes.SCREEN_WORD_EDITION.route}
        component={WordEdition}
        options={{
          headerTitle: routes.SCREEN_WORD_EDITION.title,
          headerTintColor: theme.COLORS.TEXT.PRIMARY,
          headerStyle: {
            backgroundColor: theme.COLORS.BG.PRIMARY,
          },
        }}
      />
      <SettingsStack.Screen
        name={routes.SCREEN_TAG_LIST.route}
        component={TagList}
        options={{
          headerTitle: routes.SCREEN_TAG_LIST.title,
          headerTintColor: theme.COLORS.TEXT.PRIMARY,
          headerStyle: {
            backgroundColor: theme.COLORS.BG.PRIMARY,
          },
        }}
      />
      <SettingsStack.Screen
        name={routes.SCREEN_TAG_CREATION.route}
        component={TagCreation}
        options={{
          headerTitle: routes.SCREEN_TAG_CREATION.title,
          headerTintColor: theme.COLORS.TEXT.PRIMARY,
          headerStyle: {
            backgroundColor: theme.COLORS.BG.PRIMARY,
          },
        }}
      />
      <SettingsStack.Screen
        name={routes.SCREEN_TAG_EDITION.route}
        component={TagEdition}
        options={{
          headerTitle: routes.SCREEN_TAG_EDITION.title,
          headerTintColor: theme.COLORS.TEXT.PRIMARY,
          headerStyle: {
            backgroundColor: theme.COLORS.BG.PRIMARY,
          },
        }}
      />
      <SettingsStack.Screen
        name={routes.SCREEN_PREFERENCES.route}
        component={Preferences}
        options={{
          headerTitle: routes.SCREEN_PREFERENCES.title,
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
  const {theme} = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={routes.SCREEN_SETTINGS.route}>
        <Tab.Screen
          name={routes.SCREEN_WORD_CAROUSEL.route}
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
          name={routes.SCREEN_WORD_CREATION.route}
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
          name={routes.SCREEN_SETTINGS.route}
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
