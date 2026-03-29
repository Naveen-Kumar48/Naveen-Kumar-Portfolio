export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  performance: boolean;
  marketing: boolean;
}

export interface ConsentState {
  hasConsent: boolean;
  preferences: CookiePreferences;
  timestamp: number;
}

export const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: true,  // Always ON
  performance: false,
  marketing: false
};
