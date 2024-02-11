// doing everything again for cron implementation
import { NextResponse } from "next/server";

import { getLowestPrice, getHighestPrice, getAveragePrice, getEmailNotifType } from "@/lib/utils";
import { connectToDB } from "@/lib/mongoose";
import Product from "@/lib/models/product.model";
import { scrapeAmazonProduct } from "@/lib/scraper";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";


export const maxDuration = 5;
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
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

                if (!scrapedProduct) return;

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
                    { 
                        url: product.url,
                     },
                    product
                );
                
                // 2. Check Status of each product and send email accordingly
                //  By Status we can check whether the price has drop or the product is back in stock, according to the product status
                //  send mail to the customer
                const emailNotifType = getEmailNotifType(
                    scrapedProduct,
                    currentProduct
                  );
          
                  if (emailNotifType && updatedProduct.users.length > 0) {
                    const productInfo = {
                      title: updatedProduct.title,
                      url: updatedProduct.url,
                    };
                    // Construct emailContent
                    const emailContent = await generateEmailBody(productInfo, emailNotifType);
                    // Get array of user emails
                    const userEmails = updatedProduct.users.map((user: any) => user.email);
                    // Send email notification
                    await sendEmail(emailContent, userEmails);
                  }
          

                    return updatedProduct;
                })
        )

        return NextResponse.json({
            message: 'Ok', data: updatedProducts,
        })

    } catch (error: any) {
        throw new Error(`Failed to get all products: ${error.message}`)
    }
}