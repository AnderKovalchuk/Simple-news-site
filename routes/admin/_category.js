const {Router}      = require('express')
const bodyParser    = require('body-parser')

const Category      = require('../../models/Category')


const router        = new Router()
const urlencodedParser = 
    bodyParser.urlencoded({extended: false});


router.get('/', (req, res) => {
    Category.find({ }, (err, categoryList) => {
        if(err){
            console.log(err)
            res.status(500).send(err)
            return
        }
        res.render('admin/category-list', { categoryList })
    })
})

router.post('/save', urlencodedParser, (req, res) => {
    if(req.query.id){
        Category.findByIdAndUpdate(req.query.id, {
            title:  req.body.title, 
            text:   req.body.text,
            sign:   req.body.sign,
        }, (err, category) => {
            if(err){
                console.log("~ ~ ~~~ ERR ~~~ ~ ~")
                res.status(500).send(err)
                return
            }
            if(!category){
                res.status(500).send('Не удалось найти категорию для обновления ')
                return
            }
            res.redirect('/admin/category')
        })
    } else {
        console.log(req.body)
        Category.create({
            title:  req.body.title, 
            text:   req.body.text,
            sign:   req.body.sign,
        }).catch((err) => {
            console.log("~ ~ ~~~ ERR ~~~ ~ ~")
            res.status(500).send(err)
            return
        })
        res.redirect('/admin/category')
    }
})
router.get('/delete', urlencodedParser, (req, res) => {
    Category.findByIdAndRemove(req.query.id).catch((err) => {
        console.log("~ ~ ~~~ ERR ~~~ ~ ~")
        console.log(err)
        res.status(500).send(err)
    })

    res.redirect('/admin/category')
})

router.get('/edit', (req, res) => {
    Category.findById(req.query.id, (err, category) => {
        if(err) {
            console.log("~ ~ ~~~ ERR ~~~ ~ ~")
            res.send(err)
            return
        }
        res.render('admin/category-edit', { category })
    })
})
router.get('/add', (req, res) => {
    res.render('admin/category-edit')
})


module.exports = router