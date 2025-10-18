import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  AboutScreen,
  GalleryScreen,
  HomeScreen,
  ProfileScreen,
} from '../screens';
import { AppColors } from '../utils';
import { DrawerParamList } from './types/RootStackTypes';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'left',
        headerShown: true,
        drawerStyle: styles.drawer,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: AppColors.PRIMARY_BACKGROUND,
  },
});
