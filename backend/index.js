const express = require('express');
const app = express();
var cors = require("cors");

require('dotenv').config();
const PORT = process.env.PORT || 5000;

//use cors for intergration
app.use(cors({
    origin: "*",
}))

app.use(express.json());

//import routes
const routes = require("./routes/Routes");

//mount the todo api
app.use('/api/v1', routes);

//start server
app.listen(PORT, () => {
    console.log(`Server Started successfully at port ${PORT}`);
})

//connect to db
const dbConnect = require('./config/database');
dbConnect();

//default route
app.get('/', (req, res) => {
    res.send("This is Home Page");
})