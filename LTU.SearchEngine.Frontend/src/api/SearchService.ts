import { BASE_URL } from "../helper/constants";

// Placeholder for search API call, this class should connect to BE
export const fetchFromApi = async (query: string, page: number = 0, language: string = 'sv') => {
    // Here we add fetch call to our controller in backend later
    console.log(`Searching for: ${query} on page ${page}`);
    
    const url = `${BASE_URL}/search?query=${encodeURIComponent(query)}&language=${encodeURIComponent(language)}`;
    
    const result = await fetch(url);
    
    console.log(`Result: ${result}`);

    if (!result.ok){
        throw new Error('Network response was not ok!')
    }

    return await result.json();
};