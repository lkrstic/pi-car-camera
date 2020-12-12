const ImageDatabase = require('./model_schema_image')
const AuthorizedDatabase = require('./model_schema_authorized')

function display(req, res)
{
if(req.order == "Timestamp")
{

ImageDatabase.find().sort({ "createdAt": -1 })
.then((data)=>{
    res.send(data)
})


}

else if (req.order =="Plate")

{

    ImageDatabase.find().sort({"plate":1})
    .then((data)=>{
        res.send(data)
    })


}

else if(req.order=="Timestamp_up")
{
    ImageDatabase.find().sort({ "createdAt": 1 })
    .then((data)=>{
        res.send(data)
    })
}


}

module.exports = display