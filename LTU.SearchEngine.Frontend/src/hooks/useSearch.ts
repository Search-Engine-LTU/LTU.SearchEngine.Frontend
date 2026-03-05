import { useState } from 'react';
import { validateQuery } from '../validation/SearchValidator';
import { mockSearchResults } from './mockData';
import type { SearchResponse } from '../models/SearchInterface';

export const useSearch = () => {
    const [error, setError] = useState<string | undefined>();
    const [warning, setWarning] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [searchData, setSearchData] = useState<SearchResponse | undefined>(undefined);

    const executeSearch = async (query: string) => {
        const validation = validateQuery(query);

        setError(validation.errorMessage);
        setWarning(validation.warningMessage);
        setSearchData(undefined);

        if (!validation.isValid) {
            return; 
        }

           try {
        setIsLoading(true);

        // simulating API delay (NFRQ-6001 req: response within 10s)
        await new Promise(resolve => setTimeout(resolve, 800));
     setSearchData(mockSearchResults);
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

return { executeSearch, searchData, error, warning, isLoading };
};