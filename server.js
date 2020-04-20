/**
 * RESTFul API 시작하기
 * @author Geunhyeok LEE
 */

const express = require('express')
const router = express.Router()
const app = express()

const bootstrap = require('./bootstrap')
const initApi = require('./api')

app.use(router)

bootstrap(app, router)
initApi(router)

app.listen(8080)
