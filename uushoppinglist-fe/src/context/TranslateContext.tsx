import { createContext, useContext, useEffect, useMemo, JSX, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  children: JSX.Element | JSX.Element[];
};

type TranslateContextType = {
  locales: { code: string; name: string }[];
  language: string;
  setLanguageAndSave: (language: string) => void;
};

export const useTranslateContext = () => {
  return useContext(TranslateContext);
};

export const TranslateContext = createContext<TranslateContextType>(undefined!);

export const TranslateProvider = ({ children }: Props) => {
  const { i18n, t } = useTranslation();
  const locales = useMemo(
    () => [
      { code: 'cs', name: t('header.translations.cs') },
      { code: 'en', name: t('header.translations.en') },
    ],
    [],
  );
  const [language, setLanguage] = useState<string>(locales[0].code);

  useEffect(() => {
    const preference = localStorage.getItem('language');
    if (preference) {
      setLanguage(preference);
    } else {
      setLanguage(locales[0].code);
    }
  }, []);

  const setLanguageAndSave = (language: string) => {
    setLanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  return (
    <TranslateContext.Provider value={{ locales, language, setLanguageAndSave }}>{children}</TranslateContext.Provider>
  );
};
