import axios from 'axios';
import localStorage from '../storage/storage';
import user from '../Stores/UserStore';

const API_URL = 'http://127.0.0.1:8000';

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
      user.setLoggedIn(true);
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

export function logout() {
  user.setLoggedIn(false);
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('refreshToken');
}

export default api;
