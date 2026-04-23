/**
 * @file useSearch.ts
 * @description Custom React hook that manages search state, validation, and API execution.
 */

import { useState } from 'react';
import { validateQuery } from '../validation/SearchValidator';
import { fetchFromApi } from '../Services/SearchApiFetch';
import { CustomError } from '../classes/customError';
import type { SearchResponse } from '../models/SearchInterface';


/**
 * Hook for managing the search lifecycle.
 * @property {string | undefined} error - Current error message (from validation or API).
 * @property {string | undefined} warning - Current warning message (e.g., query logic tips).
 * @property {boolean} isLoading - True while an API request is in flight.
 * @property {SearchResponse | undefined} searchData - The results returned from the backend.
 * @property {Function} executeSearch - Function to trigger a new search.
 * @returns {Object} Search state and the execution function.
 */
export const useSearch = () => {
    const [error, setError] = useState<string | undefined>();
    const [warning, setWarning] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [searchData, setSearchData] = useState<SearchResponse | undefined>(undefined);

    

    /**
     * Validates and executes a search query.
     * 1. Resets previous state.
     * 2. Runs local validation (e.g., length, empty string).
     * 3. If valid, calls the backend API via `fetchFromApi`.
     * 4. Handles errors including specialized `CustomError` from the API.
     * @param {string} query - The search query to execute.
     * @param {number} [page=1] - The page number to fetch.
     */
    const executeSearch = async (query: string, page: number = 1, language: string) => {
        const validation = validateQuery(query);

        setError(validation.errorMessage);
        setWarning(validation.warningMessage);
        setSearchData(undefined);

        if (!validation.isValid) return; 
        

        try {

            setIsLoading(true);
            const data = await fetchFromApi(query, page, language);
            
            setSearchData({...data});

            console.log("Valid query sent to API:", query); 

        } catch (err) {
            if (err instanceof CustomError) 
                setError(`Error ${err.errorCode} ${err.name}: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return { executeSearch, searchData, error, warning, isLoading };
};