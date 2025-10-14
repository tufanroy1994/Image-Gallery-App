import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  WelcomeScreen: undefined;
  DrawerNavigation: undefined | NavigatorScreenParams<DrawerParamList>;
};

export type DrawerParamList = {
  Home: undefined;
  Search: undefined;
};

export type RootRouteProps<
  RouteName extends keyof RootStackParamList | keyof DrawerParamList,
> = RouteProp<RootStackParamList & DrawerParamList, RouteName>;
