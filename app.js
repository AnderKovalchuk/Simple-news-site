const express   = require('express')
const config    = require('config')
const mongoose  = require('mongoose')
const bodyParser = require("body-parser")

const News      = require('./models/News')

const PORT = config.get('port') || 3000
const app = express()
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static('public'))
app.use(express.json({ extended: true }))

app.set('view engine', 'pug')

app.use('/admin', require('./routes/admin/admin'))
app.use('/news', require('./routes/news'))

async function dbConnect() {
    try{
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        console.log('Connect succesful')
    } catch (err) {
        console.log('! Connect Error ' + err.message )
        process.exit(1)
    }
}
dbConnect()

app.listen(PORT,  () => {
    console.log(`Server start on port ${PORT}...`)
})


app.get('/', async (req, res) => {
    const newsList = await News.find({ })
    res.render('index', {
        newsList
    })
    //res.render('index.html')
})

app.get('/pug', (req, res) => {
    res.render('index', {
        url: req.url
    })
})
app.get('/test', (req, res) => {
    res.end('Test')
})