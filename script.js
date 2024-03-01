const http = require('http')
const fs = require('fs')
const path = require('path') // для формирования корректных путей

const PORT = 1488

const server = http.createServer((req, res) => {
    console.log('server req')

    const createPath = (page) => path.resolve(__dirname, 'pages', `${page}.html`)
    const createCss = (page) => path.resolve(__dirname, 'pages', `${page}.css`)
    const createJs = (page) => path.resolve(__dirname, 'pages', `${page}.js`)
    // для чего: некоторые файловые системы используют прямую косую черту, а некоторые обратную!
    let basePath = ''

    // базовая имплементация роутинга
    switch (req.url) {
        case '/':
        case '/main':
        case '/home':
        case '/index':
            res.setHeader('Content-Type', 'text/html')
            basePath = createPath('index')
            res.statusCode = 200
            baseCss = createCss('style2')
            baseJs = createJs('script2')
            break
        case '/page1':
            res.setHeader('Content-Type', 'text/html')
            basePath = createPath('page1')
            res.statusCode = 200
            baseCss = createCss('style1')
            baseJs = createJs('script2')
            break
        case '/page2':
            res.setHeader('Content-Type', 'text/html')
            basePath = createPath('page2')
            baseCss = createCss('style2')
            baseJs = createJs('script1')
            res.statusCode = 200
            break
        case '/page3':
            res.setHeader('Content-Type', 'text/html')
            basePath = createPath('page3')
            res.statusCode = 200
            baseCss = createCss('style2')
            baseJs = createJs('script2')
            break
        case '/page4':
            res.setHeader('Content-Type', 'application/json')
            basePath = createPath('page4')
            res.statusCode = 200
            baseCss = createCss('style2')
            baseJs = createJs('script2')
            break
        case '/page5':
            res.setHeader('Content-Type', 'text/plain')
            basePath = createPath('page5')
            res.statusCode = 200
            baseCss = createCss('style2')
            baseJs = createJs('script2')
            break
        default:
            basePath = createPath('error')
            res.statusCode = 404
            baseCss = createCss('style2')
            baseJs = createJs('script2')
            break
    }

    fs.readFile(basePath, (err, htmlData) => {
        fs.readFile(baseJs, (err, cssJs) => {
            let cssContent = cssJs.toString()
            res.write(htmlData)
            res.write(`<script>${cssContent}</script>`) 
            fs.readFile(baseCss, (err, cssData) => {
                let cssContent = cssData.toString()
                res.write(`<style>${cssContent}</style>`) 
                res.end()
            })
        })
    })
})

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})