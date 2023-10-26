const mongoose = require('mongoose');

// const mongoURI = "mongodb://0.0.0.0:27017/"
const mongoURI = "mongodb url"
// const mongoURI = "mongodb://localhost:27017/?readPreference=primary&directConnection=true&tls=false"
// mongodb://localhost:27017/?readPreference=primary&directConnection=true&tls=false

// const connectToMongo = ()=>{
// mongoose.connect(mongoURI, ()=>{
//     console.log("connected to mongo successfully")
// })
// }

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(mongoURI)
        console.log('Mongo connected')
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectToMongo;