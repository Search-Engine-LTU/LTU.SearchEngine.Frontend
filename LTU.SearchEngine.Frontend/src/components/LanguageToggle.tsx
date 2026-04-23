import '../css/LanguageToggle.css'
import { useLocation, useNavigate } from "react-router-dom"

export const LanguageToggle = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isEnglish = pathname.startsWith('/en');

    const handleToggle = () => {
        const newPath = isEnglish ? '/sv' : '/en';
        navigate(newPath);
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