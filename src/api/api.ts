import storage from "../storage/storage"
import axios from 'axios'
import user from "../Stores/UserStore"


const API_URL = 'http://127.0.0.1:8000'


export function login(endpoint:string, body?:object ) {
  const url = {}
  const data = {
   ...body
  }
  	const headers = {'content-type': 'application/json', 'Authorization': ''}
  // const method = methodParam ? methodParam : 'post'
    axios({
        method: 'post',
        url: `${API_URL}/${endpoint ? `${endpoint}/` : ''}`,
        headers,
        data
      })
      .then((response) => {
        const { data } = response
        user.setLoggedIn(true)
        storage.set('token', data.access)
        storage.set('refresh', data.refresh)
      });
      
}

function api(endpoint:string, body?:object, useMethod?:string){
  const token = storage.get('token')

  const headers = {'content-type': 'application/json', 'Authorization': ''}

  if (user.loggedIn) {
    headers.Authorization = `Bearer ${token}`
  }

  const data = {...body}

  return axios({
    method: 'get',
    data,
    url: `${API_URL}/${endpoint ? `${endpoint}/` : ''}`,
    headers,
  }).then((response) => {
    return response
  })
  


}

export default api

// function api(endpoint:string, body?:object, {...customConfig} = {}) {
// 	const token = storage.get('token')
// 	console.log(token)
// 	const headers = {'content-type': 'application/json', 'Authorization': ''}
// 	if (token) {
// 		headers.Authorization = `Bearer ${token}`
// 	}
// 	const config = {
// 		method: body ? 'POST' : 'GET',
// 		...customConfig,
// 		headers: {
// 			...headers,
// 			...customConfig.headers,
// 		},
// 		body: body ? JSON.stringify(body) : undefined
// 	}

// 	console.log('@@',process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)

// 	return window
// 		.fetch(`${API_URL}/${endpoint}`, config)
// 		.then(async response => {
// 			if (response.status === 401) {
// 				logout()
// 				window.location.assign(window.location)
// 				return
// 			}
// 			if (response.ok) {
// 				return await response.json()
// 			} else {
// 				const errorMessage = await response.json()
// 				return Promise.reject(errorMessage)
// 			}
// 		})
// }

export function logout() {
    user.setLoggedIn(false)
		window.localStorage.removeItem('token')
    window.localStorage.removeItem('refreshToken')
}
// export {}