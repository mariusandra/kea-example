const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const path = require('path')
const fs = require('fs')

const webpackConfig = require('./webpack.config')

const compiler = webpack(webpackConfig)

const devServer = new WebpackDevServer(compiler, {
  publicPath: webpackConfig.output.publicPath,
  hot: false,
  inline: true,
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  disableHostCheck: true,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false
  }
})

devServer.listen(2000, '0.0.0.0', function (err) {
  if (err) console.error(err)
  console.log('=> 🔥  Webpack development server is running on port ' + 2000);

  (async () => {
    let urls = { '/': false }

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    while (true) {
      const url = Object.keys(urls).filter(u => !urls[u])[0]
      if (!url) {
        break
      }

      console.log(`Opening ${url}`)

      await page.goto(`http://localhost:2000${url}`, { waitUntil: 'networkidle' })
      await page.waitForSelector('[data-reactroot]')

      const html = await page.evaluate(() => {
        return document.documentElement.outerHTML
      })

      urls[url] = html

      const $ = cheerio.load(html)

      const links = $('a').map(function (i, elem) {
        return $(this).attr('href')
      }).get().filter(href => href.indexOf('/') === 0)

      links.forEach(link => {
        if (typeof urls[link] === 'undefined') {
          urls[link] = false
        }
      })
    }

    Object.entries(urls).forEach(([url, html]) => {
      let isIndex = url.slice(-1)[0] === '/' || Object.keys(urls).filter(u => u.indexOf(`${url}/`) === 0).length > 0

      const fileName = path.join(url + (isIndex ? '' : '.html'), isIndex ? 'index.html' : '')
      const outputPath = path.join(webpackConfig.output.path, fileName)
      console.log(`Saving ${outputPath}`)

      ensureDirectoryExistence(outputPath)
      fs.writeFileSync(outputPath, html)
    })

    browser.close()
    devServer.close()
  })()
})

function ensureDirectoryExistence (filePath) {
  var dirname = path.dirname(filePath)
  if (fs.existsSync(dirname)) {
    return true
  }
  ensureDirectoryExistence(dirname)
  fs.mkdirSync(dirname)
}
