//封装httpApi
import http from './http'
// const host = ""


class API {
  jiekouTest = params => http.post('api/ads/list',params)
}

export default new API()