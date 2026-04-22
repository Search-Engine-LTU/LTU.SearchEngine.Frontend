/**
 * @file SearchService.ts
 * @description Provides data-fetching logic for the search engine, 
 * integrating with the C# Backend API.
 */

import { BASE_URL } from "../helpers/constants";
import { CustomError } from "../classes/customError";

/**
 * Executes a search query against the backend API.
 * @param {string} query - The boolean search query (e.g., "cats AND dogs").
 * @param {number} [page=1] - The page number for pagination (1-based index).
 * @param {string} [language='sv'] - The ISO language code for results.
 * @returns {Promise<SearchResponse>} A promise resolving to the search results and metadata.
 * @throws {CustomError} Thrown when the API returns a non-2xx status code. 
 *  Includes the backend's error message (e.g., "Deep pagination restricted").
 * @example
 * try {
 *      const results = await fetchFromApi("technology", 1);
 * } catch (err) {
 *      if (err instanceof CustomError) console.error(err.errorCode);
 * }
 */
export const fetchFromApi = async (query: string, page: number = 0, language: string = 'sv') => {
    // Here we add fetch call to our controller in backend later
    console.log(`Searching for: ${query} on page ${page}`);
    
    const url = `${BASE_URL}/search?query=${encodeURIComponent(query)}&language=${encodeURIComponent(language)}`;
    
    const response = await fetch(url);
    
    console.log(`Result: ${response}`);

    if (!response.ok){
        let errorMessage = "An unexpected error occurred";
        
        try {
            const body = await response.text();
            console.log(body);
            errorMessage = body || `Error: ${response.statusText}`;
        } catch {
            errorMessage = `Error ${response.status}: ${response.statusText}`;
        }
        
        throw new CustomError(response.status, response.statusText, errorMessage);
    }

    return await response.json();
};