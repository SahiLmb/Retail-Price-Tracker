import { flattenDiagnosticMessageText } from "typescript";
import axios from "axios";
import * as cheerio from 'cheerio';
import { extractCurrency, extractDescription, extractPrice } from "../utils";
export async function scrapeAmazonProduct(url:
    string) {
        if(!url) return;

       /* curl --proxy brd.superproxy.io:22225 --proxy-user 
        brd-customer-hl_d811e9fe-zone-unblocker:j6l42nb2am32 
        -k https://lumtest.com/myip.json */


    // BrightData proxy Configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;
    
    const options = {
        auth: {
            username: `$(username)-session-$(session_id)`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try {
        // Fetch the product page
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);

        // Extract the product title
        const title = $('#productTitle').text().trim(); // # is used as a tag to get the id of the product title (in this case)
        // you can get id according to your preference through inspect on amazon's website

        const currentPrice = extractPrice(
            // get these id's below through inspecting the pages on amazon and hover over price section
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),

        );
        
        // Getting original price(not discounted)
        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'), // span classes from inspect
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')

        );

        // checking if the product is in stock or not.
        const outOfStock = $('#availability span').text().trim().toLowerCase
        () === 'currently unavailable';

        const images = 
        $('#imgBlkFront').attr('data-a-dynamic-image') ||
        $('#landingImage').attr('data-a-dynamic-image') ||
        '{}'

        const imageUrls = Object.keys(JSON.parse(images));

        const currency = extractCurrency($('.a-price-symbol'))
        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g,
        "");

            // parsing the product description in future with proper tags
        const description = extractDescription($)

            // Construct data object with scraped information
            const data = {
                url,
                currency: currency || '$',
                image: imageUrls[0],
                title,
                currentPrice:Number(currentPrice) || Number(originalPrice),
                originalPrice:Number(originalPrice) || Number(currentPrice),
                priceHistory: [],
                discountRate: Number(discountRate),
                category: 'category',
                reviewsCount: 100,
                stars: 4.5,
                outOfStock: outOfStock,
                description,
                lowestPrice: Number(currentPrice) || Number(originalPrice),
                higestPrice: Number(originalPrice) || Number(currentPrice),
                average: Number(currentPrice) || Number(originalPrice),
            }

            return data;

    } catch (error: any) {
        throw new Error(`Failed to scrape product: $(error.message)`)
    }
    }