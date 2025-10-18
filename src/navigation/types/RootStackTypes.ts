import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  WelcomeScreen: undefined;
  BottomTabNavigation:
    | undefined
    | NavigatorScreenParams<BottomTabStackParamList>;
};

export type BottomTabStackParamList = {
  DrawerNavigation: undefined | NavigatorScreenParams<DrawerParamList>;
  About: undefined;
  Gallery: undefined;
  Profile: undefined;
};

export type DrawerParamList = {
  Home: undefined;
};

export type RootRouteProps<
  RouteName extends
    | keyof RootStackParamList
    | keyof BottomTabStackParamList
    | keyof DrawerParamList,
> = RouteProp<
  RootStackParamList & BottomTabStackParamList & DrawerParamList,
  RouteName
>;
