import { Platform, StyleSheet } from 'react-native';
import { AppColors, FontSizes, hp, wp } from '../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: wp(3),
    marginHorizontal: wp(2),
    borderRadius: wp(2),
    padding: wp(3),
  },
  headerText: {
    fontSize: FontSizes.FONT_SIZE_20,
    fontWeight: 'bold',
    marginTop: hp(2),
    marginLeft: wp(2),
    marginBottom: Platform.OS === 'ios' ? hp(2) : 0,
  },
  imageContainer: {
    flex: 1,
    margin: wp(2),
  },
  image: {
    width: '100%',
    height: hp(23),
    borderRadius: wp(1),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: AppColors.RED_TEXT,
    fontSize: FontSizes.FONT_SIZE_50,
  },
});
