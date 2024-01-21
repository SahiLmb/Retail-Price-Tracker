"use server"

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

 // all the stuff here will run only on server

export async function scrapeAndStoreProduct(productURl: string){
    if(!productURl) return;

    try {
        connectToDB();
        const scrapedProduct = await scrapeAmazonProduct(productURl);

        if(!scrapedProduct) return;

        // track the product
        let product = scrapedProduct;

        const existingProduct = await Product.findOne({ url: scrapedProduct.url
        });

        if(existingProduct) {
            const updatedPriceHistory: any = [
                ...existingProduct.priceHistory,
                { price: scrapedProduct.currentPrice }
            ]

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory),

            }
        }

        const newProduct = await Product.findOneAndUpdate(
            { url: scrapedProduct.url },
            product,
            { upsert: true, new: true }
        );

        revalidatePath(`/products/${newProduct._id}`);

    } catch (error: any) {
        throw new Error(`Failed to create/update product: $(error.message)`)
    }
}