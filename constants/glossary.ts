import { useLanguageStore } from './i18n';

// Since we need translations, this file will now export a function 
// or we make it a hook to access the store.
// BUT for simplicity in the view, it's easier to keep the structure.

export const getGlossaryTerms = () => {
    const { t } = useLanguageStore.getState();

    return {
        DMA: {
            title: t('app_title'), // Using app title as placeholder or specific term if added
            description: 'Regolamento UE...', // We should move these long descriptions to translation files actually.
            // For this iteration, I'll map keys to the translation file terms properly.
        }
    }
};

// BETTER APPROACH: Move glossary content directly into translations/it.ts and en.ts
// And here just export keys.

export const GLOSSARY_KEYS = [
    'DMA', 'IAP', 'ExternalPurchase', 'Tier1', 'Tier2', 'IAF', 'CTC', 'WarningScreen'
];
