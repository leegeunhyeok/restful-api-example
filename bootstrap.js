/**
 * RESTFul API 시작하기
 * @author Geunhyeok LEE
 */

const path = require('path')
const colors = require('colors')
const express = require('express')
const bodyParser = require('body-parser')

const paddingNumber = (number, length) => {
  const sNumber = number.toString();
  if (sNumber.length >= length) {
    return sNumber;
  } else {
    let padding = '';
    for (let i = 0; i < length - sNumber.length; i++) {
      padding += '0';
    }
    return padding + sNumber;
  }
};

// 에러 로그 레벨에 따른 출력 색상
const LEVEL_COLORS = {
  info: colors.green,
  debug: colors.blue,
  success: colors.green,
  warning: colors.yellow,
  danger: colors.red,
  error: colors.red,
  critical: colors.magenta
}

/**
 * 현재 시점의 날짜, 시간 문자열을 반환합니다
 */
const timestamp = () => {
  const d = new Date()

  const yyyy = d.getFullYear()
  const MM = paddingNumber(d.getMonth() + 1, 2)
  const dd = paddingNumber(d.getDate(), 2)

  const hh = paddingNumber(d.getHours(), 2)
  const mm = paddingNumber(d.getMinutes(), 2)
  const ss = paddingNumber(d.getSeconds(), 2)
  const aaa = paddingNumber(d.getMilliseconds(), 3)

  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}.${aaa}`
}

// 해당 레벨의 로그를 출력합니다
const printLog = (level, ...msg) => {
  console.log(
    `[${timestamp()}]`.gray,
    `${LEVEL_COLORS[level](level.toUpperCase())}`,
    '-',
    ...msg
  )
}

const logger = {
  info (...msg) {
    printLog('info', ...msg)
  },
  debug (...msg) {
    printLog('debug', ...msg)
  },
  success (...msg) {
    printLog('success', ...msg)
  },
  warning (...msg) {
    printLog('warning', ...msg)
  },
  danger (...msg) {
    printLog('danger', ...msg)
  },
  error (...msg) {
    printLog('error', ...msg)
  },
  critical (...msg) {
    printLog('critical', ...msg)
  }
}

module.exports = (app, router) => {
  router.use(bodyParser.json())
  router.use(bodyParser.urlencoded({ extended: false }))
  router.use('*', (_req, res, next) => {
    const afterResponse = () => {
      res.removeListener('finish', afterResponse)
      res.removeListener('close', afterResponse)

      const url = res.req.originalUrl
      const method = res.req.method
      let sStatusCode = res.statusCode.toString()
      let logType = logger.info

      switch (sStatusCode.charAt(0)) {
        case '2':
          sStatusCode = sStatusCode.green
          break

        case '3':
          sStatusCode = sStatusCode.yellow
          break

        case '4':
        case '5':
          sStatusCode = sStatusCode.red
          logType = logger.error
          break
      }

      if (url.includes('/api')) {
        logType(`${method} ${sStatusCode} ${' API '.bgBlue.white} ${url}`)
      } else {
        logType(`${method} ${sStatusCode} ${url}`)
      }
    }

    res.on('finish', afterResponse)
    res.on('close', afterResponse)

    next()
  })

  router.use(express.static(path.join(__dirname, 'web')))
}
