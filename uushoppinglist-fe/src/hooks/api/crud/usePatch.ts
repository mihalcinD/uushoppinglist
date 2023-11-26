import { AxiosError } from 'axios';
import { useState } from 'react';
import { CacheAxiosResponse } from 'axios-cache-interceptor';
import { ResponseError } from '../../../types/Api.ts';
import { useApiContext } from '../../../context/ApiContext.tsx';

type Props = { url: string; params?: Record<string, string> };
const usePatch = <T, K>({ url, params }: Props) => {
  const { axios } = useApiContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<K>();
  const [error, setError] = useState<ResponseError>();

  const patch = (data: T, newUrl?: string): Promise<K> => {
    const properURL = newUrl ?? url;
    console.log('[PATCH] url: ', properURL, ' PARAMS: ', params, ' DATA: ', data);
    setError(undefined);
    setIsLoading(true);
    return new Promise<K>((resolve, reject) =>
      axios
        .patch(properURL, data, { params: params })
        .then((res: CacheAxiosResponse<K, any>) => {
          setResponse(res.data);
          setIsLoading(false);
          resolve(res.data);
        })
        .catch(({ response: res }: AxiosError) => {
          console.error('[PATCH] url: ', url, res?.data, res?.status);
          setError({ message: res?.data, code: res?.status });
          setIsLoading(false);
          reject(res?.status);
        }),
    );
  };

  return { isLoading, response, error, patch };
};

export default usePatch;
