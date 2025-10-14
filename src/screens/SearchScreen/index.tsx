import React, { useState } from 'react';
import { View, FlatList, TextInput, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import Snackbar from 'react-native-snackbar';

import { useAppNavigation, useFlickerSearch } from '../../hooks';
import { styles } from './styles';

const SearchScreen = () => {
  const navigation = useAppNavigation('Search');

  const { photos, loading, error, searchPhotos, loadMore } = useFlickerSearch();
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (!query.trim()) return;
    searchPhotos(query.trim());
  };

  if (error) {
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
    <View style={[styles.container]}>
      <TextInput
        placeholder="Search (e.g. cat, dog)"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        style={[styles.input]}
      />
      {loading && photos.length === 0 && <ActivityIndicator size={'large'} />}
      <FlatList
        data={photos}
        keyExtractor={item => item.id}
        numColumns={2}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && photos.length > 0 ? <ActivityIndicator /> : null
        }
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <FastImage source={{ uri: item.url_s }} style={styles.image} />
          </View>
        )}
      />
    </View>
  );
};

export default SearchScreen;
