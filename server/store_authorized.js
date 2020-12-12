const mongoose = require('mongoose')
const uri = process.env.ATLAS_URI
const AuthorizedDatabase = require('./model_schema_authorized')


mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB was successful")
})



function Store (req, res)
{


plate= req.plate
ownership = req.ownership

console.log(plate)

const newAuthorized = new AuthorizedDatabase({  plate, ownership });

    
    AuthorizedDatabase.find({plate: req.plate})
    .then((data) => {
    
     
   
     if (data.length== 0)
     {
     newAuthorized.save()
     .then(() => console.log("authorization given"))
     .catch((err) => console.log(err)) 
     res.send('authorization given')
     }

     else{
        res.send('user is already authorized')
     }

    


    })


}


module.exports = Store;