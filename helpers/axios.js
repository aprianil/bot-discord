const axios = require('axios')
const {BaseUrl,SecretToken} = require('./config')
var jwt = require('jsonwebtoken');

class RequestAxios {
    static get(url) {
        
        const token = jwt.sign({ id: '1234',name:'closa' }, SecretToken);
        return new Promise((resolve, reject) => {
            axios.get(BaseUrl + url, {
                headers: {
                    'content-type': 'application/json',
                    'access_token':token
                }
            }
            )
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })

    }

    static delete(url) {
        const token = jwt.sign({ id: '1234',name:'closa' }, SecretToken);
        return new Promise((resolve, reject) => {
            axios.delete(BaseUrl + url, {
                headers: {
                    'content-type': 'application/json',
                    'access_token':token
                }
            }
            )
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })

    }

    static post(url, data) {
        const token = jwt.sign({ id: '1234',name:'closa' }, SecretToken);
        return new Promise((resolve, reject) => {
            axios.post(BaseUrl + url, data, {
                headers: {
                    'content-type': 'application/json',
                    'access_token':token
                }}
            )
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })

    }
    static put(url, data) {
        const token = jwt.sign({ id: '1234',name:'closa' }, SecretToken);
        return new Promise((resolve, reject) => {
            axios.put(BaseUrl + url, data, {
                headers: {
                    'content-type': 'application/json',
                    'access_token':token
                }}
            )
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    reject(error)
                })
        })

    }
}


module.exports = RequestAxios
