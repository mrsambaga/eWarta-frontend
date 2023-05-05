import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { QueryParams } from '../constant/QueryParam';

export type FetchData<T> = {
  out: T;
  loading: boolean;
  error: AxiosError | null;
};

const useFetchGet = <T>(
  url: string,
  token?: string,
  params?: QueryParams,
  refresh?: boolean
): FetchData<T> => {
  const [out, setOut] = useState<T>({} as T);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    setLoading(true);
    console.log(params)
    const fetchData = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const config = { headers, params };
        const response = await axios.get(url, config);
        setOut(response?.data);
        setError(null);
      } catch (error) {
        const err = error as AxiosError | null;
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, params?.category, params?.date, params?.type, params?.title, refresh]);

  return { out, loading, error };
};

export default useFetchGet;
