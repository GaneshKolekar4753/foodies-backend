const mongoose=require("mongoose");
const mongoURI="mongodb+srv://kolekarganesh5151:rsh7lJQhavpGdqFN@cluster0.kizv8ln.mongodb.net/";
mongoose.connect(`${mongoURI}gofood`);

const database = mongoose.connection;

database.on('error', console.error.bind(console, "Error connecting to MongoDB"));

database.once('open', async function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = database;