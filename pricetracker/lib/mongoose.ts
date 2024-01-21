import mongoose from 'mongoose';

let isConnected = false; // Varible to track connection status

export const connectToDB = async() => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGO_DB_URI) return console.log('MONGODB_URI is not defined');

    if(isConnected) return console.log('=> using existing database connection');
       
    // if not connected but still have mongodb uri
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);

        isConnected = true;

        console.log('=> MongoDB connected');
    } catch (error) {
        console.log(error)
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 5080735f72156443fccd3ae7428b9e7e3dbc0dd9
