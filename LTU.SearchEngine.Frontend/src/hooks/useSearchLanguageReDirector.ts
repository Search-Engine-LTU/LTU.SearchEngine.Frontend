import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LANGUAGE_COOKIE_NAME } from "../helpers/constants";
import Cookies from "js-cookie"; 


/**
 * Hook responsible for root-level redirection based on user history.
 * @description
 * This hook acts as a "Middleware" that monitors the application's entry point.
 * 1. It listens for changes to the URL path.
 * 2. If the user is at the root ('/'), it retrieves the `LANGUAGE_COOKIE_NAME`.
 * 3. It forces a navigation to the localized version of the site.
 * 4. Uses `{ replace: true }` to maintain a clean browser history.
 */
export const useSearchLanguageReDirector = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        
        if (location.pathname === '/'){ 
            const lastLanguage = Cookies.get(LANGUAGE_COOKIE_NAME);
            
            if (lastLanguage === 'en') navigate('/en', { replace: true });
            else if (lastLanguage === 'sv') navigate('/sv', { replace: true });
        } 
        
    }, [navigate, location.pathname]);
}   