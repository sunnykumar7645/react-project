const mongoose = require('mongoose')


const connectToDB = async ()=>{
    DATABASE_URL = process.env.DATABASE_URL || 4000
    try {
        const connect = await mongoose.connect(DATABASE_URL);
        console.log(`Database is connected succesfully : ${connect.connection.host}, ${connect.connection.name}`)
        
    } catch (error) {
        console.log(error)
        process.exit(1);
        
    }
};

module.exports = connectToDB;