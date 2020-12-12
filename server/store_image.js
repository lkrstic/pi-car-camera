const mongoose = require('mongoose')
const uri = process.env.ATLAS_URI
const ImageDatabase = require('./model_schema_image')
const AuthorizedDatabase = require('./model_schema_authorized')


mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB was successful")
})


function cleanString (oldstring)
{
var newstring = oldstring.substring(1, oldstring.length -1)
newstring = "/" + newstring
return newstring

}

function Store (req, res)
{
A= []
 
image = cleanString(String(req.image))
make =req.make
plate= req.plate

console.log(plate)

const newImage = new ImageDatabase({ image, make, plate });

        
newImage.save()
    .then(() => console.log("new Image added"))
    .catch((err) => console.log(err)) 
    
    AuthorizedDatabase.find({plate: req.plate})
    .then((data) => {
    
        for (index in data)
    {
        var ownership =data[index]["ownership"];
        break;
    }
   
     if (data.length!= 0)
     {
         obj= {
         "authorized": "yes",
         "onwership":ownership

         }

     }

     else{
        obj= {
            "authorized": "no",
            "onwership": 'none'
   
            }
     }

    

     res.send(obj)

    })


}


module.exports = Store;