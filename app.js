const express   = require('express')
const config    = require('config')
const mongoose  = require('mongoose')

const News      = require('./models/News')

const PORT = config.get('port') || 3000
const app = express()

app.use(express.static('public'))
app.set('view engine', 'pug')

async function dbConnect() {
    try{
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('Connect succesful')
    } catch (err) {
        console.log('! Connect Error ' + err.message )
        process.exit(1)
    }
}
dbConnect()

app.listen(PORT, () => {
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