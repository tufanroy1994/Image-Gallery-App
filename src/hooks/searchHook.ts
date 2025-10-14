import { useState } from 'react';
import axios from 'axios';

export type PhotoItem = {
  id: string;
  title: string;
  url_s?: string;
};

const useFlickerSearch = () => {
  const [searchResults, setSearchResults] = useState<PhotoItem[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const searchPhotos = async (searchText: string, pageNum = 1) => {
    if (!searchText) return;
    setSearchLoading(true);
    setSearchError(null);
    setQuery(searchText);

    try {
      const res = await axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s&text=${encodeURIComponent(
          searchText,
        )}&per_page=20&page=${pageNum}`,
      );

      const items: PhotoItem[] = (res.data.photos?.photo || []).map(
        (p: any) => ({
          id: p.id,
          title: p.title,
          url_s: p.url_s,
        }),
      );

      // ✅ Merge + deduplicate results by ID
      setSearchResults(prev => {
        const merged = pageNum === 1 ? items : [...prev, ...items];
        const unique = Array.from(new Map(merged.map(p => [p.id, p])).values());
        return unique;
      });

      setPage(pageNum);
    } catch (e: any) {
      setSearchError('Network error');
    } finally {
      setSearchLoading(false);
    }
  };

  // ✅ Load next page if not currently loading
  const loadMore = () => {
    if (!searchLoading && query) {
      searchPhotos(query, page + 1);
    }
  };

  return {
    searchResults,
    searchLoading,
    searchError,
    searchPhotos,
    loadMore,
  };
};

export default useFlickerSearch;
