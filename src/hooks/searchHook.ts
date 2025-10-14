import { useState } from 'react';
import axios from 'axios';

export type PhotoItem = {
  id: string;
  title: string;
  url_s?: string;
};

const useFlickerSearch = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const searchPhotos = async (searchText: string, pageNum = 1) => {
    if (!searchText) return;
    setLoading(true);
    setError(null);
    setQuery(searchText);
    try {
      const res = await axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s&text=${searchText}&per_page=20&page=${pageNum}`,
      );

      const items = (res.data.photos?.photo || []).map((p: any) => ({
        id: p.id,
        title: p.title,
        url_s: p.url_s,
      }));

      // ✅ Append results when loading next page
      setPhotos(pageNum === 1 ? items : [...photos, ...items]);
      setPage(pageNum);
    } catch (e: any) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Use the stored query when loading more
  const loadMore = () => {
    if (!loading && query) {
      searchPhotos(query, page + 1);
    }
  };

  return { photos, loading, error, searchPhotos, loadMore };
};

export default useFlickerSearch;
