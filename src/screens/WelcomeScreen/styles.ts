import { StyleSheet } from 'react-native';
import { AppColors, FontSizes } from '../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: AppColors.RED_TEXT,
    fontSize: FontSizes.FONT_SIZE_50,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
