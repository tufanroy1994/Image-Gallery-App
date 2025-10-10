import React from 'react';
import { StatusBar } from 'react-native';

import { AppColors } from './src/utils';
import AppNavigation from './src/navigation/AppNavigation';

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={AppColors.PRIMARY_BACKGROUND}
      />
      <AppNavigation />
    </>
  );
};

export default App;
