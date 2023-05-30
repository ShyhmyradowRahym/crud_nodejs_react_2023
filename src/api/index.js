import axios from 'axios';
import { getCookie } from '../Cookies';

const baseURL = 'http://localhost:5000';
axios.defaults.withCredentials=true
const service = axios.create({ baseURL });
service.interceptors.request.use(
    res => {
        res.headers['Authorization'] = 'Bearer ' + getCookie('token')
        return res;
    },
    err => {
        return Promise.reject(err)
    }
);

service.interceptors.response.use(
    res => { return res },
    err => {
        const status = err.response ? err.response.status : null;
        const originalRequest = err.config;
        
        if (status === 403 && !originalRequest._retry) {
            originalRequest._retry = true
            service.get('admin/refresh-token',
                { headers: { Authorization: `Bearer ${localStorage.getItem('refresh_token')}` } })
                .then(res => {
                    localStorage.setItem('access_token', res.data)
                })
                .catch(err => {
                    console.log(err);
                })
            return service(originalRequest)
        }
        return Promise.reject(err)
    }
)
export default service