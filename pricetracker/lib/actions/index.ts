"use server"
import { scrapeAmazonProduct } from "../scraper";

 // all the stuff here will run only on server

export async function scrapeAndStoreProduct
(productURl: string){
    if(!productURl) return;

    try {
        const scrapedProduct = await 
        scrapeAmazonProduct(productURl);
    } catch (error: any) {
        throw new Error(`Failed to create/update product: $(error.message)`)
    }
}