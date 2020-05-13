const {Router}      = require('express')
const bodyParser    = require('body-parser')

const News          = require('../../models/News')
const Category      = require('../../models/Category')

const router        = new Router()
const urlencodedParser = 
    bodyParser.urlencoded({extended: false});

router.get('/', async (req, res) => {
    try{
        let categorys =  await Category.find({ })
        let newsList =  await News.find({ })

        res.render('admin/news-list', { 
            categorys,
            newsList,
        })
    } catch (err) {
        console.log("~ ~ ~~~ ERR ~~~ ~ ~")
        res.status(500).send(err)
        return
    }
})

router.post('/save', urlencodedParser, (req, res) => {
    if(req.query.id){
        News.findByIdAndUpdate(req.query.id, {
            title:  req.body.title,
            shortText:  req.body.shortText, 
            text:   req.body.text,
            sign:   req.body.sign,
        }, (err, news) => {
            if(err){
                console.log("~ ~ ~~~ ERR ~~~ ~ ~")
                res.status(500).send(err)
                return
            }
            if(!news){
                res.status(500).send('Не удалось найти категорию для обновления ')
                return
            }
            res.redirect('/admin/news')
        })
    } else {
        console.log(req.body)
        News.create({
            title:  req.body.title,
            shortText:  req.body.shortText, 
            text:   req.body.text,
            sign:   req.body.sign,
        }).catch((err) => {
            console.log("~ ~ ~~~ ERR ~~~ ~ ~")
            res.status(500).send(err)
            return
        })
        res.redirect('/admin/news')
    }
})
router.get('/delete', urlencodedParser, (req, res) => {
    News.findByIdAndRemove(req.query.id).catch((err) => {
        console.log("~ ~ ~~~ ERR ~~~ ~ ~")
        console.log(err)
        res.status(500).send(err)
    })

    res.redirect('/admin/news')
})

router.get('/edit', (req, res) => {
    News.findById(req.query.id, (err, news) => {
        if(err) {
            console.log("~ ~ ~~~ ERR ~~~ ~ ~")
            res.send(err)
            return
        }
        res.render('admin/news-edit', { news })
    })
})
router.get('/add', (req, res) => {
    res.render('admin/news-edit')
})





router.get('/add/news', (req, res) => {
    res.render('admin/add-news')
})
router.post('/add/news', urlencodedParser, async (req, res) => {
    console.log(req.body);
    const news = new News({
        title: req.body.title, 
        text:  req.body.text
    })
    await news.save()
    res.redirect('/')
})


module.exports = router