import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import { useAppNavigation, useCachedRecentPhotos } from '../../hooks';
import { styles } from './styles';

const HomeScreen = () => {
  const navigation = useAppNavigation('DrawerNavigation');

  const { photos, loading, error, loadMore, loadingMore } =
    useCachedRecentPhotos();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Recent Photos</Text>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={photos}
        keyExtractor={item => item.id}
        numColumns={2}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <FastImage source={{ uri: item.url_s }} style={styles.image} />
          </View>
        )}
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
