const mongoose = require('mongoose');
const initData=require('./data.js');
const Listing = require ('../models/listing.js');

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Connected DB successfully");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB= async ()=>
{
    Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
        ...obj,
        owner: "69c971f16369dc62b371fa2c"
    }));
    await Listing.insertMany(initData.data);
    console.log("Data is initialised");
}

initDB();