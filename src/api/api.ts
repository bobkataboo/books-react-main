import axios from 'axios';
import { ArrayTypeNode } from 'typescript';
import { parseJwt } from '../functions/functions';
import localStorage from '../storage/storage';
import user from '../Stores/UserStore';

const API_URL = 'https://bo-ooks.herokuapp.com';

export function login(endpoint:string, body?:object, history?:any) {
  const initialData = {
    ...body,
  };
  const headers = { 'content-type': 'application/json', Authorization: '' };
  // const method = methodParam ? methodParam : 'post'
  axios({
    method: 'post',
    url: `${API_URL}/${endpoint ? `${endpoint}/` : ''}`,
    headers,
    data: initialData,
  })
    .then((response) => {
      const { data } = response;
      // eslint-disable-next-line camelcase
      const { user_id } = parseJwt(data.access);
      user.setLoggedIn(true, user_id);
      localStorage.set('token', data.access);
      localStorage.set('refresh', data.refresh);
      history.push('/books');
    });
}

function api(endpoint:string, body?:object) {
  const token = localStorage.get('token');

  const headers = { 'content-type': 'application/json', Authorization: '' };

  if (user.loggedIn) {
    headers.Authorization = `Bearer ${token}`;
  }

  const data = { ...body };

  return axios({
    method: 'get',
    data,
    url: `${API_URL}/${endpoint ? `${endpoint}/` : ''}`,
    headers,
  }).then((response) => response);
}

export function post(endpoint:string, body?:object) {
  const token = localStorage.get('token');

  const headers = { 'content-type': 'application/json', Authorization: '' };

  if (user.loggedIn) {
    headers.Authorization = `Bearer ${token}`;
  }

  const data = { ...body };

  return axios({
    method: 'post',
    data,
    url: `${API_URL}/${endpoint ? `${endpoint}/` : ''}`,
    headers,
  }).then((response) => response);
}

export function apiDelete(endpoint:string) {
  const token = localStorage.get('token');

  const headers = { 'content-type': 'application/json', Authorization: '' };

  if (user.loggedIn) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios({
    method: 'delete',
    url: `${API_URL}/${endpoint ? `${endpoint}/` : ''}`,
    headers,
  }).then((response) => response);
}

interface BookDataInterface{
  data: {items:ArrayTypeNode},
}

export function searchBooks(search:string) {
  return axios({
    method: 'get',
    url: `https://www.googleapis.com/books/v1/volumes?q=${search}`,
  }).then((data:BookDataInterface) => data).catch((error) => console.log('@@@@ error', error));
}

export function apiUpdate(endpoint:string, body?:object) {
  const token = localStorage.get('token');

  const headers = { 'content-type': 'application/json', Authorization: '' };

  if (user.loggedIn) {
    headers.Authorization = `Bearer ${token}`;
  }

  const data = { ...body };

  return axios({
    method: 'patch',
    data,
    url: `${API_URL}/${endpoint ? `${endpoint}/` : ''}`,
    headers,
  }).then((response) => response);
}

export function logout(history) {
  history.push('/login/');
  user.setLoggedIn(false);
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('refreshToken');
}

export default api;
