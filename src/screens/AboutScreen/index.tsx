import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';

const AboutScreen = () => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.text]}>About Screen</Text>
    </View>
  );
};

export default AboutScreen;
