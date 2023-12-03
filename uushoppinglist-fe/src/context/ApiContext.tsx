import { createContext, useContext, useEffect, useMemo, JSX } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { AxiosCacheInstance, setupCache } from 'axios-cache-interceptor';
import { config } from '../config.ts';
import { useAuth0 } from '@auth0/auth0-react';

type Props = {
  children: JSX.Element | JSX.Element[];
};

type ApiContextType = {
  axios: AxiosCacheInstance;
};

export const useApiContext = () => {
  return useContext(ApiContext);
};

export const ApiContext = createContext<ApiContextType>(undefined!);

export const ApiProvider = ({ children }: Props) => {
  const { getAccessTokenSilently } = useAuth0();
  const BASE_URL = config.domain;

  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    baseURL: BASE_URL,
  };

  const axiosInstance = useMemo(() => {
    //here we can configure caching properties for axios
    return setupCache(axios.create(axiosConfig), { ttl: 0 });
  }, []);

  useEffect(() => {
    axiosInstance.interceptors.request.use(async config => {
      const token = await getAccessTokenSilently();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.baseURL = BASE_URL;
      return config;
    });
  }, []);

  return <ApiContext.Provider value={{ axios: axiosInstance }}>{children}</ApiContext.Provider>;
};
