import { getLocaleFromUser } from '@/lib/utils/locale';
import { defaultLocale } from '@/i18n';
import type { LoginResponse } from '@/lib/types/api';

describe('getLocaleFromUser', () => {
  it('should return defaultLocale when user is null', () => {
    expect(getLocaleFromUser(null)).toBe(defaultLocale);
  });

  it('should prioritize userLanguageId when provided', () => {
    const user = {
      userLanguageId: 'en',
      companyLanguageId: 'es',
      countryLanguageId: 'ca',
      effectiveLanguageId: 'es',
    } as unknown as LoginResponse;

    expect(getLocaleFromUser(user)).toBe('en');
  });

  it('should fallback to companyLanguageId if userLanguageId is not provided', () => {
    const user = {
      companyLanguageId: 'ca',
      countryLanguageId: 'en',
      effectiveLanguageId: 'es',
    } as unknown as LoginResponse;

    expect(getLocaleFromUser(user)).toBe('ca');
  });

  it('should fallback to countryLanguageId if user and company language are not provided', () => {
    const user = {
      countryLanguageId: 'en',
      effectiveLanguageId: 'ca',
    } as unknown as LoginResponse;

    expect(getLocaleFromUser(user)).toBe('en');
  });

  it('should fallback to effectiveLanguageId as last priority', () => {
    const user = {
      effectiveLanguageId: 'ca',
    } as unknown as LoginResponse;

    expect(getLocaleFromUser(user)).toBe('ca');
  });

  it('should return defaultLocale if the provided language is unsupported', () => {
    const user = {
      userLanguageId: 'fr', // Unsupported
    } as unknown as LoginResponse;

    expect(getLocaleFromUser(user)).toBe(defaultLocale);
  });

  it('should return defaultLocale if no language info is present in user', () => {
    const user = {} as unknown as LoginResponse;

    expect(getLocaleFromUser(user)).toBe(defaultLocale);
  });
});