const {Router}      = require('express')
const bodyParser    = require('body-parser')

const News          = require('../models/News')

const router        = new Router()
const urlencodedParser = 
    bodyParser.urlencoded({extended: false});

router.get('/:id', async (req, res) => {
    console.log(req)
    
    News.findById(req.params.id, (err, news) => {
        if(err) {
            console.log("~ ~ ~~~ ERR ~~~ ~ ~")
            res.send(err)
            return
        }
        res.render('news', { news })
    })
})

module.exports = router