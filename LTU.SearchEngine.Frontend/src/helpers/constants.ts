/**
 * The base endpoint for the C# Search API.
 * Change this when moving from development to production (e.g., 'https://api.yourdomain.com').
 */
export const BASE_URL = "http://localhost:5212/api";

/**
 * The key name used for the language preference cookie.
 * Shared between useLanguage (Writer) and useSearchLanguageReDirector (Reader).
 */
export const LANGUAGE_COOKIE_NAME = 'user_preferred_language'

/**
 * Shared configuration for browser cookies.
 * @property {number} expires - Duration in days (1 year).
 * @property {string} path - Set to '/' to ensure the cookie is accessible across all sub-routes.
 */
export const DEFAULT_COOKIE_OPTIONS = { expires: 365, path: '/' };