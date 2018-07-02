function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
function getCtx (selector) {
  const pages = getCurrentPages()
  const ctx = pages[pages.length - 1]

  const componentCtx = ctx.selectComponent(selector)

  if (!componentCtx) {
    console.error('无法找到对应的组件，请按文档说明使用组件')
    return null
  }
  return componentCtx
}
function Toast (options) {
  const { selector = '#toast' } = options
  const ctx = getCtx(selector)

  ctx.handleShow(options)
}

Toast.hide = function (selector = '#toast') {
  const ctx = getCtx(selector)

  ctx.handleHide()
}

function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// export default {
//   formatNumber,
//   formatTime,
//   // Toast
// }
module.exports = {
  $Toast: Toast,
  formatNumber: formatNumber,
  formatTime,
}
