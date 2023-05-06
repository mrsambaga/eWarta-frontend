import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

const useFetchPost = <T>(
  url: string,
  body: T,
  submit: boolean,
  toggleSubmit: () => void,
  token?: string,
  contentType?:string,
): any => {
  const [out, setOut] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    if (submit) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const headers = token ? { Authorization: `Bearer ${token}` } : token && contentType ? {"content-type": "multipart/form-data", Authorization: `Bearer ${token}`} : {};
          const config = { headers };
          const response = await axios.post(url, body, config);
          setOut(response?.data);
          setError(null);
        } catch (error) {
          setError(error as AxiosError);
        } finally {
          setLoading(false);
          toggleSubmit();
        }
      };
      fetchData();
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);

  return { out, loading, error };
};

export default useFetchPost;
