import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Snackbar from 'react-native-snackbar';

import {
  useAppNavigation,
  useCachedRecentPhotos,
  useFlickerSearch,
} from '../../hooks';
import { styles } from './styles';

const HomeScreen = () => {
  const navigation = useAppNavigation('DrawerNavigation');

  const { photos, loading, error, loadMore, loadingMore } =
    useCachedRecentPhotos();

  const {
    searchPhotos,
    searchResults,
    searchLoading,
    searchError,
    loadMore: loadMoreSearch,
  } = useFlickerSearch();

  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setIsSearching(false); // empty search → show recent photos
      return;
    }
    setIsSearching(true);
    await searchPhotos(query.trim());
  };

  const renderFooter = () => {
    if (!loadingMore && !searchLoading) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  };

  const dataToShow = isSearching ? searchResults : photos;

  if ((loading || searchLoading) && dataToShow.length === 0) {
    // Show full-screen loader on initial load
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="gray" />
      </SafeAreaView>
    );
  }

  const errorToShow = isSearching ? searchError : error;
  if (errorToShow && dataToShow.length === 0) {
    Snackbar.show({
      text: 'Network error. Retry?',
      duration: Snackbar.LENGTH_INDEFINITE,
      action: {
        text: 'RETRY',
        textColor: 'green',
        onPress: () => handleSearch(),
      },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search (e.g. cat, dog)"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        style={styles.input}
      />

      <Text style={styles.headerText}>
        {isSearching ? 'Search Results' : 'Recent Photos'}
      </Text>

      <FlatList
        data={dataToShow}
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
        onEndReached={!isSearching ? loadMore : undefined} // disable pagination while searching
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
