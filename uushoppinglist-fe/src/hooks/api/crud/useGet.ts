import { AxiosError } from 'axios';
import { useState } from 'react';
import { CacheAxiosResponse, CacheProperties } from 'axios-cache-interceptor';
import { ResponseError } from '../../../types/Api.ts';
import { useApiContext } from '../../../context/ApiContext.tsx';

type Props = {
  url: string;
  params?: Record<string, number>;
  cache?: false | Partial<CacheProperties<never, never>> | undefined;
};
const useGet = <T>({ url, params, cache }: Props) => {
  const { axios } = useApiContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<ResponseError>();

  const get = (newParams?: Record<string, number>): Promise<T | undefined> => {
    const currentParams = newParams ?? params;
    console.log('[GET] url: ', url, ' PARAMS: ', currentParams);
    setError(undefined);
    setIsLoading(true);
    return new Promise<T | undefined>((resolve, reject) =>
      axios
        .get(url, { params: currentParams, cache })
        .then((res: CacheAxiosResponse<T, never>) => {
          setData(res.data);
          setIsLoading(false);
          resolve(res.data);
        })
        .catch(({ response }: AxiosError) => {
          console.error('[GET] url: ', url, response?.data, response?.status);
          setError({ message: response?.data, code: response?.status });
          setIsLoading(false);
          resolve(undefined);
        }),
    );
  };

  const refetch = async () => {
    await get();
  };

  return { isLoading, data, error, get, refetch, setData };
};

export default useGet;
