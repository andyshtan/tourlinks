import { scenario } from '../scenario';
import { translations } from './translations';
import type { SupportedLanguage, TranslationDictionary } from './translations';
import { translationsUmrah } from './translationsUmrah';

// Each demo scenario has its own wording and its own set of languages
export const dictionaries: Partial<Record<SupportedLanguage, TranslationDictionary>> =
  scenario === 'umrah' ? translationsUmrah : translations;

export const availableLanguages = Object.keys(dictionaries) as SupportedLanguage[];

export const dictionaryFor = (lang: SupportedLanguage): TranslationDictionary =>
  dictionaries[lang] || translations.en;
