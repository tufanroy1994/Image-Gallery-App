import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AboutScreen, GalleryScreen, ProfileScreen } from '../screens';
import { BottomTabStackParamList } from './types/RootStackTypes';
import DrawerNavigation from './DrawerNavigation';
import { AppColors, hp, wp } from '../utils';

const Tab = createBottomTabNavigator<BottomTabStackParamList>();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: AppColors.PRIMARY_BACKGROUND,
          height: hp(7),
          padding: wp(1),
        },
      }}
    >
      <Tab.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused
                  ? AppColors.PRIMARY_TEXT
                  : AppColors.DISABLE_TAB_BACKGROUND,
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused
                  ? AppColors.PRIMARY_TEXT
                  : AppColors.DISABLE_TAB_BACKGROUND,
              }}
            >
              About
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused
                  ? AppColors.PRIMARY_TEXT
                  : AppColors.DISABLE_TAB_BACKGROUND,
              }}
            >
              Gallery
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused
                  ? AppColors.PRIMARY_TEXT
                  : AppColors.DISABLE_TAB_BACKGROUND,
              }}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
