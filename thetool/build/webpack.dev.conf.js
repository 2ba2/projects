'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const axios = require('axios')
const bodyParser = require('body-parser')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    before(app) {
      app.use(bodyParser.urlencoded({extended: true}))
      const querystring = require('querystring')

      // 头条
      app.get('/api/toutiao', function(req, res) {
        axios.get('http://v.juhe.cn/toutiao/index',{
          params: Object.assign({key: '553d8a4f9a44b8f5dbd6221175f76c09'}, req.query)
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      // 微信
      app.get('/api/weixin', function(req, res) {
        axios.get('http://v.juhe.cn/weixin/query',{
          params: Object.assign({key: '5c81477d55a8b6dcb16c4af4a80a380b'}, req.query)
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      // 菜谱大全
      app.get('/api/cook/query', function(req, res) {
        axios.get('http://apis.juhe.cn/cook/query.php',{
          params: Object.assign({key: 'a35f4f97f6b1338940846515bc689e1a'}, req.query)
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      // 菜谱分类标签
      app.get('/api/cook/category', function(req, res) {
        axios.get('http://apis.juhe.cn/cook/category',{
          params: Object.assign({key: 'a35f4f97f6b1338940846515bc689e1a'}, req.query)
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      // 按标签检索菜谱
      app.get('/api/cook/index', function(req, res) {
        axios.get('http://apis.juhe.cn/cook/index',{
          params: Object.assign({key: 'a35f4f97f6b1338940846515bc689e1a'}, req.query)
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      // 按菜谱ID查看详细
      app.get('/api/cook/queryid', function(req, res) {
        axios.get('http://apis.juhe.cn/cook/queryid',{
          params: Object.assign({key: 'a35f4f97f6b1338940846515bc689e1a'}, req.query)
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      // 智能回复接口
      app.get('/api/iqa/query', function(req, res) {
        axios.get('http://jisuznwd.market.alicloudapi.com/iqa/query',{
          headers: {
            Authorization: 'APPCODE 11680bbc54c5445c9c89caa7cccf445f'
          },
          params: Object.assign({}, req.query)
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      // 图片笑话
      app.get('/api/joke/picJoke', function(req, res) {
        axios.get('http://ali-joke.showapi.com/picJoke',{
          headers: {
            Authorization: 'APPCODE 11680bbc54c5445c9c89caa7cccf445f'
          },
          params: Object.assign({}, req.query)
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      // 文本笑话
      app.get('/api/joke/textJoke', function(req, res) {
        axios.get('http://ali-joke.showapi.com/textJoke',{
          headers: {
            Authorization: 'APPCODE 11680bbc54c5445c9c89caa7cccf445f'
          },
          params: Object.assign({}, req.query)
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })

      // 动态图笑话
      app.get('/api/joke/gifJoke', function(req, res) {
        axios.get('http://ali-joke.showapi.com/gifJoke',{
          headers: {
            Authorization: 'APPCODE 11680bbc54c5445c9c89caa7cccf445f'
          },
          params: Object.assign({}, req.query)
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
    },
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
