import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  BottomTabStackParamList,
  RootStackParamList,
  DrawerParamList,
} from '../navigation/types/RootStackTypes';

const useAppNavigation = (
  screenName:
    | keyof RootStackParamList
    | keyof BottomTabStackParamList
    | keyof DrawerParamList,
) => {
  type Props = StackScreenProps<
    RootStackParamList & BottomTabStackParamList & DrawerParamList,
    typeof screenName
  >;
  type ScreenNavigationProp = Props['navigation'];

  const navigation = useNavigation<ScreenNavigationProp>();
  return navigation;
};

export default useAppNavigation;
