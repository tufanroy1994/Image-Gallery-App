import React from 'react';
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

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  };

  if (loading && photos.length === 0) {
    // Show initial loader when app first loads
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="gray" />
      </SafeAreaView>
    );
  }

  if (error && photos.length === 0) {
    // Show error state
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.error}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Recent Photos</Text>

      <FlatList
        data={photos}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <FastImage
              source={{ uri: item.url_s }}
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
