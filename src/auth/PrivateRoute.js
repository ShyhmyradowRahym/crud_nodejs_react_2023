import { Navigate, Outlet } from 'react-router-dom'
import { getCookie } from '../Cookies';

const useAuth = () => {
    const token = getCookie('token')
    const user = { loggedIn: token ? true : false };
    return user && user.loggedIn
}
const PrivateRoute = () => {
    const isauth = useAuth()
    return isauth ? <Outlet /> : <Navigate to='/login' />
};
export default PrivateRoute