import fetch from 'node-fetch';
import Config from '@/../config/config';
// method 大写GET,POST
// params json
export default function fetchRequest(url, method = 'POST', params = {}) {
  const header = {
    'Content-Type': 'application/json;charset=UTF-8',
  };

  const request = {
    method,
    headers: header
  };
  let reqUrl = Config.backend + url;

  if (method === 'GET' || method === 'get') {
    let getParams = '';
    Object.keys(params).forEach((item) => {
      getParams += getParams === '' ? '?' : '&';
      getParams += `${item}=${params[item]}`;
    });
    reqUrl += getParams;
  } else if (method === 'POST' || method === 'post') {
    request.body = JSON.stringify(params); // body参数，通常需要转换成字符串后服务器才能解析
  }

  const _fetch = fetch(reqUrl, request)
    .then((response) => response.json())
    .then((responseData) => responseData)
    .catch((err) => {
      console.log('request fail', err);
      // throw '网络连接异常';
    });
  // 10秒无返回提示超时
  const timerPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('网络连接超时'));
    }, 12 * 1000);
  });
  return Promise.race([_fetch, timerPromise]);
}
