const http = require('http')
const url = require('url')

const server = new http.Server()

server.listen(3030, '192.168.0.105')

let counter = 0; 
server.on('request', (req, res) => {
    console.log(req.method, req.url)

    const urlParset = url.parse(req.url, true)
    console.log( urlParset )
    console.log(req.headers)
    debugger;
    if(urlParset.pathname == '/test'){
        res.end(`
            Start! \n
            Request num: \t ${++counter} \n
            Url: \t ${req.url} \n
            Metod: \t ${req.method} \n
            Set: \t ${urlParset.query.page}`
        )
    } else {
        res.statusCode = 404
        res.end("404! Page not found")
    }

})  