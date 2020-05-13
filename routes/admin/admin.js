const {Router}      = require('express')
const bodyParser    = require('body-parser')

const router        = new Router()

const urlencodedParser = 
    bodyParser.urlencoded({extended: false});

router.use('/category', require('./_category'))
router.use('/news', require('./_news'))

router.get('/', (req, res) => {
    res.render('admin/admin')
})
// router.post('/add/news', urlencodedParser, async (req, res) => {
//     console.log(req.body);
//     const news = new News({
//         title: req.body.title, 
//         text:  req.body.text
//     })

//     await news.save()

//     res.redirect('/')
// })


module.exports = router