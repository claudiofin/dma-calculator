import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { it } from './translations/it';
import { en } from './translations/en';
import { de } from './translations/de';
import { fr } from './translations/fr';
import { es } from './translations/es';

const i18n = new I18n({ it, en, de, fr, es });

// Set default locale from device or fallback to 'en'
const deviceLocale = getLocales()[0]?.languageCode ?? 'en';
i18n.locale = deviceLocale;
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export type Language = 'it' | 'en' | 'de' | 'fr' | 'es';

export const SUPPORTED_LANGUAGES: { code: Language; label: string; flag: string }[] = [
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
];

interface LanguageState {
    locale: Language;
    setLocale: (locale: Language) => void;
    t: (key: string, options?: object) => string;
}

// Simple store for language persistence
export const useLanguageStore = create<LanguageState>()(
    persist(
        (set, get) => ({
            locale: SUPPORTED_LANGUAGES.some(l => l.code === deviceLocale)
                ? (deviceLocale as Language)
                : 'en',
            setLocale: (locale) => {
                i18n.locale = locale;
                set({ locale });
            },
            t: (key, options) => i18n.t(key, { ...options, locale: get().locale }),
        }),
        {
            name: 'language-storage',
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    i18n.locale = state.locale;
                }
            }
        }
    )
);

// Hook for translations to ensure reactivity
export const useTranslation = () => {
    const locale = useLanguageStore((state) => state.locale);
    const setLocale = useLanguageStore((state) => state.setLocale);

    return {
        t: (key: string, options?: object) => i18n.t(key, { ...options, locale }),
        locale,
        setLocale
    };
};

export default i18n;
