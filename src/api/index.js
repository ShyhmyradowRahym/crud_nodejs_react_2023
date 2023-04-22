import axios from 'axios';

const baseURL = 'http://95.85.127.250:3000';
const service = axios.create({ baseURL });

service.interceptors.request.use(
    res => {
        res.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
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