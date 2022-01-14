import axios from 'axios';

const httpCliente = axios.create(
    {
        baseURL: 'https://gfinc-api.herokuapp.com'
    }
)
class ApiService {

    constructor(apiUrl){
        this.apiUrl = apiUrl;
    }

    post(url, objeto){
        const requestUrl = `${this.apiUrl}${url}`;
        return httpCliente.post(requestUrl, objeto);
    }

    put(url, objeto){
        const requestUrl = `${this.apiUrl}${url}`;
        return httpCliente.put(requestUrl, objeto);
    }

    delete(url){
        const requestUrl = `${this.apiUrl}${url}`;
        return httpCliente.delete(requestUrl);
    }

    get(url){
        const requestUrl = `${this.apiUrl}${url}`;
        return httpCliente.get(requestUrl);
    }
}

export default ApiService;