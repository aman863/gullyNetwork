const fs= require("fs");
const mongoose= require("mongoose");
const dotenv=require("dotenv");
const Transaction= require("./models/transactionModel");

dotenv.config({path:"./config.env"});
const DB= process.env.DATABASE.replace("<password>",process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
    
    
}).then(()=> console.log("Database connected succesfully")).catch((err)=>{
    console.log(err);
    console.log("Error while connecting to database");
});

const transactions= JSON.parse(fs.readFileSync("C:/Users/aman/Desktop/webProjects/gullyNetwork/test.json","utf-8"));

const importData= async()=>{
    try {
        // // transactions.forEach(transaction=> transaction.time= new Date(transaction.time).toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
        // transactions.map(transaction=>{
        //    transaction.time= new Date(transaction.time).toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
        //   return transaction.time;
        // });
        await Transaction.create(transactions);
        console.log("data successfully imported");
        process.exit();
    } catch (err) {
        console.log(err);

    }
}

const deleteData= async()=>{
    try{
        await Transaction.deleteMany();
        console.log("data successfully deleted");
        process.exit();
    }
    catch(err){
        console.log(err);
    }
}

if(process.argv[2]==="--import"){
    importData();
}

else if(process.argv[2]==="--delete"){
    deleteData();
}