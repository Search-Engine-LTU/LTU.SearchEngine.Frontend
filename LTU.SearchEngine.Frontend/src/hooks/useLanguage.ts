import { useEffect } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom"
import { DEFAULT_COOKIE_OPTIONS, LANGUAGE_COOKIE_NAME } from "../helpers/constants";

/**
 * Hook to manage and persist the application's language state.
 * @returns {currentLanguage} The active language code ('en' | 'sv').
 * @example const { currentLanguage } = useLanguage();
 * @description
 * 1. Detects language by checking if the URL path starts with '/en'.
 * 2. Updates the `LANGUAGE_COOKIE_NAME` cookie only when on explicit language routes.
 * 3. Prevents "Cookie Overwriting" when the user is at the root ('/') path.
 */
export const useLanguage = () => {
    const { pathname } = useLocation();

    const currentLanguage = pathname.startsWith('/en') ? 'en' : 'sv';

    useEffect(() => {
        
        if (pathname === '/en' || pathname === '/sv'){
            Cookies.set(LANGUAGE_COOKIE_NAME, currentLanguage, DEFAULT_COOKIE_OPTIONS);
        }

    }, [currentLanguage, pathname]);

    return { currentLanguage }
}

