import request from '../utils/request';

export async function query(params,url,token) {
  return request(url, {
    method: 'get',
    body: params,
    isToken: true,
    useToken:token?token:""
  });
}
export async function create(params, url) {
  return request(url, {
    method: 'post',
    body: params,
    isToken: true
  });
}

export async function remove(params,url) {
  return request(url, {
    method: 'delete',
    body: params,
    isToken: true
  });
}

export async function update(params,url) {
  return request(url, {
    method: 'put',
    body: params,
    isToken: true
  });
}

export async function usersQ(params,url,isToken) {
  return request(url, {
    method: 'post',
    body: params,
   // isToken: isToken
  });
}
