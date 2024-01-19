"use client"

import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react";

const isValidAmazonProductURL = (url: string) => {
    try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;
    // Check if hostname contains amazon.com or amazon.(countrycode)
if(hostname.includes('amazon.com') || 
    hostname.includes('amazon.') || 
    hostname.endsWith('amazon')
    ) {
        return true;
    }
    }catch (error){
        return false;
    }

        return false;
}
const Searchbar = () => {
    // to keep track of URL entered
const [searchPrompt, setsearchPrompt] = useState('');
const [isLoading, setisLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();

        const isValidLink = isValidAmazonProductURL(searchPrompt);

            if(!isValidLink) return alert('Invalid Link, please enter valid Amazon URL')
            
            try {
                setisLoading(true);

                // Scraping the product page
                const product = await scrapeAndStoreProduct(searchPrompt);
            } catch (error) {
                console.log("Error!")
            } finally {
                setisLoading(false);
            }
    }
  return (
    <form className="flex flex-warp gap-4 mt-12"
    onSubmit={handleSubmit}
>
    <input
    type="text"
    value={searchPrompt}
    onChange={(e) => setsearchPrompt(e.target.value)} // to keep track of input
    placeholder="Enter URL of product"
    className="searchbar-input"
    />

    <button
        type="submit" 
        className="searchbar-btn"
        disabled={searchPrompt === ''} // if nothing is on the searchbar it is disabled
        >
        {isLoading ? 'Searching...' : 'Search'}
    </button>
</form>
)
}

export default Searchbar