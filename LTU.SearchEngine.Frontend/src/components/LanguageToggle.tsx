import '../css/LanguageToggle.css'
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

/**
 * A toggle switch component that allows users to switch between Swedish and English routes.
 * @description
 * This component handles language routing by switching the URL prefix between `/sv` and `/en`.
 * Crucially, it preserves any existing search parameters (e.g., `?query=...`) during the 
 * transition to ensure the user's search context is not lost.
 * @returns A styled toggle switch with labels for SV and EN.
 */
export const LanguageToggle = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();

    const isEnglish = pathname.startsWith('/en'); 

    /**
     * Handles the language switch event.
     * 1. Determines the target language path.
     * 2. Captures the current query string.
     * 3. Navigates to the new path while appending the original query string.
     */
    const handleToggle = () => {
        const newPath = isEnglish ? '/sv' : '/en';
        const currentQueryString = searchParams.toString();

        navigate({
            pathname: newPath,
            search: currentQueryString ? `?${currentQueryString}` : ""
        });
    }

    return (
        <div className="language-toggle">
            <span>SV</span>
            <label className="switch">
                <input type="checkbox" checked={isEnglish} onChange={handleToggle}/>
                <span className="slider round"></span>
            </label>
            <span>EN</span>
        </div>
    );
}