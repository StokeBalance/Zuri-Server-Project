const path = require('path')
const fs = require('fs')
const http = require('http')

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html': req.url)
    let contentType = getContentType(filePath) || 'text/html'
    let emptyPagePath= path.join(__dirname, 'public', '404.html')
    fs.readFile(filePath, 'utf8', (err, content) => {
      if(err){
        if(err.code ==='ENOENT'){
          fs.readFile(emptyPagePath, 'utf8', (err, content) => {
            res.writeHead(200, {'Content-Type': contentType})
            res.end(content)
          })
        }else {
          res.writeHead(500)
          res.end('A server error has occured')
        }
      }
      if (!err){
        res.writeHead(200, {'Content-Type': contentType})
        res.end(content)
      }
    })
})

const getContentType = (filePath) => {
  let extname = path.extname(filePath)
  if (extname === '.js'){
    return 'text/javascript'
  }
  if  (extname === '.css'){
    return 'text/css'
  }
}


const port = 5000
server.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})