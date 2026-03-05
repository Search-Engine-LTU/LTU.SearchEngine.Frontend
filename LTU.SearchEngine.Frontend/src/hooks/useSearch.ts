import { useState } from 'react';
import { validateQuery } from '../validation/SearchValidator';

export const useSearch = () => {
    const [results, setResults] = useState<any[]>([]); 
    const [error, setError] = useState<string | undefined>();
    const [warning, setWarning] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);

    const executeSearch = async (query: string) => {
        const validation = validateQuery(query);

        setError(validation.errorMessage);
        setWarning(validation.warningMessage);

        if (!validation.isValid) {
            setResults([]); 
            return; 
        }

           try {
        setIsLoading(true);

        // simulating API delay (NFRQ-6001 req: response within 10s)
        await new Promise(resolve => setTimeout(resolve, 800));
     
            // Here we going to make our API call to backend.api (searchcontroller)
            // Exempel: const response = await FrontendClient.get(`/api/search?q=${encodeURIComponent(query)}`);
            // setResults(response.data);
            
            console.log("Valid query sent to API:", query); 
        } catch (err) {
            setError("A network error occurred while searching.");
        } finally {
            setIsLoading(false);
        }
    };

    return { executeSearch, results, error, warning, isLoading };
};