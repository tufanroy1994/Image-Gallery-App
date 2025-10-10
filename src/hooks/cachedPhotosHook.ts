import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

export type PhotoItem = {
  id: string;
  title: string;
  url_s?: string;
};

const STORAGE_KEY = 'flickr_recent_cached';

const useCachedRecentPhotos = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const prevIdsRef = useRef<string | null>(null);
  const hasMoreRef = useRef<boolean>(true);

  useEffect(() => {
    let mounted = true;

    async function loadFromCache() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed: PhotoItem[] = JSON.parse(raw);
          prevIdsRef.current = parsed.map(p => p.id).join(',');
          if (mounted) setPhotos(parsed);
        }
      } catch (e) {
        // ignore cache errors
      }
    }

    async function fetchAndSync(initialPage = 1) {
      setLoading(true);
      try {
        const net = await NetInfo.fetch();
        if (!net.isConnected) {
          setLoading(false);
          return;
        }

        const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=${initialPage}&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s`;
        const res = await axios.get(url);
        const items: PhotoItem[] = (res.data.photos?.photo || []).map(
          (p: any) => ({
            id: p.id,
            title: p.title,
            url_s: p.url_s,
          }),
        );

        if (items.length === 0) hasMoreRef.current = false;

        const newList = initialPage === 1 ? items : [...photos, ...items];
        const newIds = newList.map(p => p.id).join(',');

        // update only if changed (API response changed)
        if (newIds !== prevIdsRef.current) {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
          prevIdsRef.current = newIds;
          if (mounted) setPhotos(newList);
        }
      } catch (e: any) {
        setError(e.message || 'fetch failed');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    }

    loadFromCache().then(() => fetchAndSync(1));

    return () => {
      mounted = false;
    };
  }, []);

  const loadMore = async () => {
    if (loadingMore || !hasMoreRef.current) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    try {
      const url = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=${nextPage}&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s`;
      const res = await axios.get(url);
      const items: PhotoItem[] = (res.data.photos?.photo || []).map(
        (p: any) => ({
          id: p.id,
          title: p.title,
          url_s: p.url_s,
        }),
      );

      if (items.length === 0) hasMoreRef.current = false;

      const updated = [...photos, ...items];
      prevIdsRef.current = updated.map(p => p.id).join(',');
      setPhotos(updated);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoadingMore(false);
    }
  };

  return {
    photos,
    loading,
    error,
    loadMore,
    loadingMore,
  };
};

export default useCachedRecentPhotos;
