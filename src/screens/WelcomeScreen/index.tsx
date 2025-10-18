import React, { useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import { AppImage } from '../../utils';
import { useAppNavigation } from '../../hooks';
import { styles } from './styles';

const WelcomeScreen = () => {
  const navigation = useAppNavigation('WelcomeScreen');

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('BottomTabNavigation');
    }, 2000);
  }, [navigation]);

  return (
    <View style={[styles.container]}>
      <ImageBackground
        source={AppImage.LOGO}
        resizeMode="cover"
        style={[styles.image]}
      >
        <Text style={[styles.text]}>Image {'\n'}Gallery</Text>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;
