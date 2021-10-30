import storage from "../storage/storage"
import axios from 'axios'


const API_URL = 'http://127.0.0.1:8000'


function api(endpoint:string, body?:object) {
  console.log("@@@@@@ endPoint", endpoint)
  console.log("@@@@ body", body)
  const url = {}
    axios({
        method: 'post',
        url: `${API_URL}/${endpoint ? `${endpoint}/` : ''}`,
        headers: {
          
        }
        // data: {
        //   firstName: 'Fred',
        //   lastName: 'Flintstone'
        // }
      }).then(response => {
        console.log("@@@@@ data", response)
      });
      
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

// function logout() {
// 		window.localStorage.removeItem(localStorageKey)
// }
export {}