const router = require('express').Router();
const store = require('./store_authorized')
const display = require('./display_authorized')

router.route('/show').post((req, res) => {
    const response = req.body;
    console.log(response)

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
