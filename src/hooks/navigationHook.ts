import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  RootStackParamList,
  DrawerParamList,
} from '../navigation/types/RootStackTypes';

const useAppNavigation = (
  screenName: keyof RootStackParamList | keyof DrawerParamList,
) => {
  type Props = StackScreenProps<
    RootStackParamList & DrawerParamList,
    typeof screenName
  >;
  type ScreenNavigationProp = Props['navigation'];

  const navigation = useNavigation<ScreenNavigationProp>();
  return navigation;
};

export default useAppNavigation;
