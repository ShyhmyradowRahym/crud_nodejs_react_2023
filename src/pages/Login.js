import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import service from '../api/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCookie } from '../Cookies';
const Login = () => {
    const [email, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = () => {
        // console.log(login,' ',password);
        // if (login==='Rahym' && password==250399) {
        //     navigate('/')
        // }
        service.post('/login', { email, password }).then(
            res => {
               
                if (res.data.message === "Success") {
                    navigate('/')
                    toast.success(res.data.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
                else{
                    toast.error(res.data.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            }
        )
    }
    return (
        <div className="fixed w-full right-0 top-0 h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{
            // background: '#2c3e50',
            background: 'linear-gradient(to bottom, #3498db, #2c3e50)'

        }}>
            <ToastContainer />
            <div className="max-w-xs w-full bg-white p-5 space-y-6">
                <div>
                    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-indigo-600">LOGIN</h2>
                </div>
                <div className="mt-8 space-y-10">
                    <div className="rounded-md shadow-sm">
                        <div className='mb-2'>
                            <input onChange={e => setLogin(e.target.value)} type="text" name='login' required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Login" />
                        </div>
                        <div>
                            <input onChange={e => setPassword(e.target.value)} type="password" name='password' required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                        </div>
                    </div>
                    <div className='mt-20'>
                        <button onClick={() => handleLogin()} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                                </svg>
                            </span>
                            LOGIN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login