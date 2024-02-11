// doing everything again for cron implementation

import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose"
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeAmazonProduct } from "@/lib/scraper";
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from "@/lib/utils";
import { NextResponse } from "next/server";

export const maxDuration = 300;
export const dynamic = 'force-dynamic'
export const revalidate = 0;

export async function GET() {
    try {
        connectToDB(); // connecting to db again

        // Getting all the products
        const products = await Product.find({});

        if(!products) throw new Error("No products found");

        // 1. RESCRAPE LATEST PRODUCT DETAILS & UPDATE DB
        const updatedProducts = await Promise.all(
            products.map(async (currentProduct) => {
                // scraping the products we already had in the database 
                const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);

                if(!scrapedProduct) throw new Error("No product found");

                // same as lib/action, here we are updating the price history
                const updatedPriceHistory = [
                    ...currentProduct.priceHistory,
                    { price: scrapedProduct.currentPrice }
                ]
    
                const product = {
                    ...scrapedProduct,
                    priceHistory: updatedPriceHistory,
                    lowestPrice: getLowestPrice(updatedPriceHistory),
                    highestPrice: getHighestPrice(updatedPriceHistory),
                    averagePrice: getAveragePrice(updatedPriceHistory),
    
                }
            
    
                const updatedProduct = await Product.findOneAndUpdate(
                    { url: product.url },
                    product,
                );
                
                // 2. Check Status of each product and send email accordingly
                //  By Status we can check whether the price has drop or the product is back in stock, according to the product status
                //  send mail to the customer
                    const emailNotifType = getEmailNotifType(scrapedProduct,currentProduct);

                    if(emailNotifType && updatedProduct.users.length > 0) {
                        const productInfo = {
                            title: updatedProduct.title,
                            url: updatedProduct.url,
                        }

                        const emailContent = await generateEmailBody(productInfo, emailNotifType);

                        // getting an array of userEmails to whom we want to send the emails
                        const userEmails =  updatedProduct.users.map((user: any) => user.email)

                        await sendEmail(emailContent, userEmails);
                    }

                    return updatedProduct;

                })
        )
        return NextResponse.json({
            message: 'Ok', data: updatedProducts
        })

    } catch (error) {
        throw new Error(`Error in GET: &{error}`)
    }
}