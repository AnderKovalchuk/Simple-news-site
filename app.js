const express   = require('express')
const http      = require ('http')
const config    = require('config')

const PORT = config.get('port') || 5214
http.createServer( function(req, res){
    res.setHeader('Content-Type', 'text/html')
    if(req.url == '/') {
        res.end('Hi <b> Ander </b>! This is Home')
    } else {
        res.end(`Not found \n${req.url}`)
    }
}).listen(PORT)

// const app = express();

// const PORT = config.get('port') || 5214

// app.set('views', './views')
// app.set('view engine', 'ejs')

// // app.use(express.json({ extended: true }))

// app.listen(PORT, 
//     () => console.log(`Server start on port ${PORT} ...`))

// app.use( (req, res) => {
//     res.end('Heloo')
// })

// app.use( (req, res) => {
//     res.send(404, "Page not found!")
// })



//--------
// const mongoose  = require('mongoose')

// const server = express();

// const PORT = config.get('port') || 5000

// // async function dbConnect() {
// //     try{
// //         await mongoose.connect(config.get('mongoUri'), {
// //             useNewUrlParser: true,
// //             useUnifiedTopology: true,
// //             useCreateIndex: true
// //         })
// //     } catch (err) {
// //         console.log('! Connect Error ' + err.message )
// //         process.exit(1)
// //     }
// // }

// // dbConnect()
// server.use(express.json({ extended: true }))
// server.use('/api/login', require('./routes/login.routes'))


// server.listen(PORT, 
//     () => console.log(`Server start on port ${PORT} ...`))