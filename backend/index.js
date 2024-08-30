const express =require('express');
const cors=require('cors');
const morgan =require('morgan');
require('dotenv').config();
require('./db/connections.js');
const userRoutes= require('./routes/userRoutes.js');
const Port= 3001;


const app = express();


app.use(cors());
app.use(morgan('dev'));
app.use('/apiu',userRoutes);

app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`);

})