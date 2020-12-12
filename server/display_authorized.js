
const AuthorizedDatabase = require('./model_schema_authorized')

function display(req, res)
{
if(req.plate != "")
{
AuthorizedDatabase.find().sort({ timestamp: -1 })
.then((data)=>{
    res.send(data)
})
}

else{
    res.send("no plate passed to be authorized")
}

}




module.exports = display