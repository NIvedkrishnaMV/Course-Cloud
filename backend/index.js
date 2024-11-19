const express =require('express');
const cors=require('cors');
const morgan =require('morgan');
require('dotenv').config();
require('./db/connections.js');
const userRoutes= require('./routes/userRoutes.js');
const pdfRoutes = require('./routes/pdfRoutes.js')
const teacherRoutes = require('./routes/teacherRoutes.js')
const Port= 3001;


const app = express();


app.use(cors());
app.use(morgan('dev'));
app.use("/files",express.static("files"));
app.use('/apiu',userRoutes);
app.use('/apit',teacherRoutes);
app.use('/apip',pdfRoutes);

app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`);

})