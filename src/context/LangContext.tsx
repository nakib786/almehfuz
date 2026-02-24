'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Lang, MultiLang } from '@/data/siteData';
import { translations } from '@/data/translations';

interface LangContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: (key: string) => string;
    tData: (obj: MultiLang) => string;
    isRTL: boolean;
    dir: 'ltr' | 'rtl';
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>('en');

    const isRTL = lang === 'ar' || lang === 'ur';
    const dir = isRTL ? 'rtl' : 'ltr';

    const setLang = useCallback((newLang: Lang) => {
        setLangState(newLang);
    }, []);

    useEffect(() => {
        document.documentElement.lang = lang;
        document.documentElement.dir = dir;
        document.body.className = `lang-${lang}`;

        const titleMap: Record<Lang, string> = {
            en: 'Al Mehfuz Khanqah ae Qadriyaa',
            ur: 'المحفوظ خانقاہ عائی قادریہ',
            ar: 'الخانقاه المحفوظ القادرية',
            hi: 'अल मेहफ़ुज़ खानक़ाह-ए-क़ादिरिया',
        };
        document.title = titleMap[lang];
    }, [lang, dir]);

    const t = useCallback((key: string): string => {
        return translations[lang]?.[key] || translations.en?.[key] || key;
    }, [lang]);

    const tData = useCallback((obj: MultiLang): string => {
        return obj[lang] || obj.en || '';
    }, [lang]);

    return (
        <LangContext.Provider value={{ lang, setLang, t, tData, isRTL, dir }}>
            {children}
        </LangContext.Provider>
    );
}

export function useLang() {
    const context = useContext(LangContext);
    if (!context) throw new Error('useLang must be used within a LangProvider');
    return context;
}
