import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import service from '../api';
const PrivateRoute = () => {
    const [auth, setAuth] = useState(false)
    useEffect(() => {
        getData()
    })
    const getData = () => {
        service.get('/admin/checkTokens').then(
            res => {
                res.status === 403 || res.status === 401 && setAuth(true)
            }
        )
    }
    return (<>
        {auth ? <Outlet /> : <Navigate to='/login' />}
    </>)
};
export default PrivateRoute