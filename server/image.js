const router = require('express').Router();
const store = require('./store_image')
const display = require('./display_image')
const authorize = require('./display_authorized')
var cors = require('cors')

router.use(cors())

router.route('/show').post((req, res) => {
    const order = req.body;
    console.log(order)
    A=[]
    //res.send("image received with all infos")
    display(req.body, res)




})

router.route('/save').post((req, res) => {
    //--const image = req.body;
    //--console.log(image)

    //res.send("image received with all infos")
    store(req.body, res)



})

module.exports = router;
