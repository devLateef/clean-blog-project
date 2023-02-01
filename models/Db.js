const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true, useUnifiedTopology: true
        })
        console.log('MONGODB CONNECTED');
    }
    catch(err){
        console.log('ERROR', err.message);
    }
}

module.exports = connectDB
