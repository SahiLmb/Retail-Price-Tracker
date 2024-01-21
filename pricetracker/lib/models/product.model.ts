<<<<<<< HEAD
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true },
    currency: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true},
    currentPrice: { type: Number, required: true},
    originalPrice: { type: Number, required: true},
    priceHistory: [
        {
            price: { type: Number, required: true},
            date: { type: Date, default: Date.now }
        },
    ],
    lowestPrice: {type: Number },
    highestPrice: { type: Number},
    averagePrice: {type: Number},
    discountRate: {type: Number},
    description: {type: String},
    category: { type: String },
    reviewsCount:{ type: Number},
    isOutOfStock: {type: Boolean, default: false },
    users: [
        {email: {type: String, required: true}}
        ], default: [],    
    }, {timestamps: true}); // to keep track of changes

    // turn above defined schema into models based of which we will be able to turn it into documents
    const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

=======
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true },
    currency: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true},
    currentPrice: { type: Number, required: true},
    originalPrice: { type: Number, required: true},
    priceHistory: [
        {
            price: { type: Number, required: true},
            date: { type: Date, default: Date.now }
        },
    ],
    lowestPrice: {type: Number },
    highestPrice: { type: Number},
    averagePrice: {type: Number},
    discountRate: {type: Number},
    description: {type: String},
    category: { type: String },
    reviewsCount:{ type: Number},
    isOutOfStock: {type: Boolean, default: false },
    users: [
        {email: {type: String, required: true}}
        ], default: [],    
    }, {timestamps: true}); // to keep track of changes

    // turn above defined schema into models based of which we will be able to turn it into documents
    const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

>>>>>>> 5080735f72156443fccd3ae7428b9e7e3dbc0dd9
    export default Product;