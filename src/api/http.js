// const Fly = require('flyio/dist/npm/wx')
// const fly = new Fly()

import config from '@/config.js'
// //添加拦截器
// fly.interceptors.request.use((config,promise)=>{
//   //给所有请求添加自定义header
//   config.headers["X-Tag"]="flyio";
//   return config;
// })
const TEST_URL = config.url
const BASE_URL = config.url
const URL = process.env.NODE_ENV === 'development' ? TEST_URL : BASE_URL
// //配置请求基地址
// fly.config.baseURL = URL

// Page({
//   //事件处理函数
//   bindViewTap: function() {
//     //调用
//     fly.get("http://10.10.180.81/doris/1/1.0.0/user/login",{xx:6}).then((d)=>{
//       //输出请求数据
//       console.log(d.data)
//       //输出响应头
//       console.log(d.header)
//     }).catch(err=>{
//       console.log(err.status,err.message)
//     })
//   }
// })

import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'
const vm = new Vue()
axios.defaults.adapter = function(config){
  return new Promise((resolve,reject) => {
    console.log(config)
    wx.request({
      url: config.url,
      data: config.data,
      header: config.headers,
      method: config.method,
      dataType: config.dataType,
      // success: config.
    })
    
  })
}


//发送一般请求
const http = axios.create({
  timeout: 5000,
  baseURL: URL,
  header: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Credentials': 'true'
  }
})
//拦截器
http.interceptors.request.use(config => {
  // if(localStorage.getItem('sessionId')) {
  //   config.data += '&sessionId=' + localStorage.getItem('sessionId')
  // }
  return config
}, err => {
  return Promise.reject(error);
})

//form请求
const form = axios.create({
  timeout: 60000,
  baseURL: URL,
  headers: {
    'Content-Type' : 'multipart/form-data'
  }
})

export default {
    // get( url ,params = {}){
  //   return new Promise (async (resolve, reject) => {
  //     try {
  //       const data = await http.get(url,{params})
  //       const code = Number(data.data.errorCode)
  //       if (code === 0) resolve (data.data)
  //       else {
  //         // 提示报错信息
  //       }
  //     }
  //     catch(err) {
  //       console.log(err)
  //     }
  //   }) 
  // }, 
  post(url, params = {},back=true ) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await http.post(url, qs.stringify(params))
        const code = Number(data.data.code)
        if(code === 1) {
          resolve(data.data)
        } else if (code === 2 ) {
          // 重新登陆 清除登陆信息 location.reload()
          // window.location.reload()
          vm.$toast(data.data.desc)
          setTimeout(()=>{
            // vm.$router.push({path: '/Login'})  
            window.location.href = "/dist/index.html#/Login"
          },2500) 
        } else {
          vm.$toast(data.data.desc)
          if(back){
            setTimeout(()=>{
              history.go(-1)    
            },2500) 
          }
          
        }
      }
      catch (err) {
        console.log(err)
      }
      
    })
  },
  // hasPost(url, params = {} ) {
  //   //执行加载层
  //   vm.$postLoad()
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const data = await http.post(url, qs.stringify(params))
  //       const code = Number(data.data.code)
  //       if(code === 1) {
  //         resolve(data.data)
  //       } else if (code === 2 ) {
  //         // 重新登陆 清除登陆信息 location.reload()
  //         // window.location.reload()
  //         vm.$toast(data.data.desc)
  //       } else {
  //         vm.$toast(data.data.desc)
  //       }
  //       vm.$postLoad(false)
  //     }
  //     catch (err) {
  //       console.log(err)
  //       vm.$postLoad(false)
  //     }
      
  //   })
  // },

  form(url, params={}) {
    return new Promise(async (reslove, reject) => {
      try{
        const data = await form.post(url,params)
        const code = Number(data.data.code)
        if(code === 1) {
          reslove(data.data)
        } else {
          vm.$toast(data.data.desc)
  
        }
     
      }
      catch (err) {
        console.log(err)
      }
    })
    
  },
}
