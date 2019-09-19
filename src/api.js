//  import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/http://localhost:8000/api',
  json: true
})

const getAuthKeysCall = async () => {
  try {
    return await axios.post('https://cors-anywhere.herokuapp.com/http://localhost:8000/api/login',
      {email: 'admin@admin.com', password: 'password'}, {headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'}})
  } catch (error) {
    console.error(error)
  }
}

const getToken = async () => {
  getAuthKeysCall().then(response => {
    if (response.data.api_token) {
      return response.data.api_token
    }
  }).catch(error => {
    console.log(error)
  })
}

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
    let accessToken = await getToken()
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        ContentType: 'application/json'
      }
    }).then(req => {
      console.log(req)
      return req.data
    }).catch(error => {
      console.log(error)
    })
  },
  getCompanies () {
    return this.execute('get', '/company')
  },
  getCompany (id) {
    return this.execute('get', `/company/${id}`)
  },
  createCompany (data) {
    return this.execute('post', '/company', data)
  },
  updateCompany (id, data) {
    return this.execute('put', `/company/${id}`, data)
  },
  deleteCompany (id) {
    return this.execute('delete', `/company/${id}`)
  }
}
