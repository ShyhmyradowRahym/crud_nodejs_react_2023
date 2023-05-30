import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'
import { MdOutlineLogout } from 'react-icons/md'
import { BiMenu } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'
import service from '../api'
const NavBar = ({ toggleMenu, setToggleMenu, children }) => {
    const navigate = useNavigate()
    const handleLogout=()=>{
        service.get('/logout').then(
            res=>{
                navigate('/login')
                alert(res.data.message)
                localStorage.clear()
            }
        ).catch(err=>console.log(err))
    }
    return (
        <div className='flex w-full'>
            <div className={`${toggleMenu ? 'md:w-60' : 'w-20'} scrolll flex flex-row h-screen  text-gray-800 bg-indigo-500 relative`}>
                <aside className="sidebar md:shadow w-full  duration-150 ease-in">
                    <div className="sidebar-header flex items-center justify-center py-4">
                        <div className={`flex w-full px-1 ${toggleMenu ? "justify-between" : "justify-end"}`}>
                            {toggleMenu && <span className="leading-10 md:block hidden text-gray-100 text-md font-bold ml-1 uppercase">Brandname</span>}
                            <button className='text-white md:block hidden' onClick={() => setToggleMenu(!toggleMenu)}>
                                {toggleMenu ? <BiMenu className='text-xl' /> : <IoMdClose className='text-xl' />}
                            </button>
                        </div>
                    </div>
                    <div className="sidebar-content py-6">
                        <ul className="flex flex-col w-full">
                            <li>
                                <Link to='/'
                                    className={`flex flex-row items-center ${!toggleMenu ? "justify-center" : "justify-start"} h-10 px-3 hover:bg-white hover:text-black text-gray-300`}>
                                    <AiOutlineHome className='text-2xl' />
                                    {toggleMenu && <span className="ml-3 md:block hidden">Dashboard</span>}
                                </Link>
                            </li>
                            <li>
                                <Link to="/admins"
                                    className={`flex flex-row items-center ${!toggleMenu ? "justify-center" : "justify-start"} h-10 px-3 hover:bg-white hover:text-black text-gray-300`}>
                                    <FiUsers className='md:text-2xl text-xl' />
                                    {toggleMenu && <span className="ml-3 md:block hidden">Admins</span>}
                                </Link>
                            </li>
                        </ul>
                        <li onClick={() =>  handleLogout()}
                            className={`cursor-pointer absolute bottom-0 w-full flex flex-row items-center ${!toggleMenu ? "justify-center" : "justify-start"} h-10 px-3 hover:bg-white hover:text-black text-gray-300`}>
                            <MdOutlineLogout className='md:text-2xl text-xl' />
                            {toggleMenu && <p className="ml-3 md:block hidden">Logout</p>}
                        </li>
                    </div>
                </aside>
            </div>
            <div className='w-full'>
                {children}
            </div>
        </div>
    )
}

export default NavBar