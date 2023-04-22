import React from 'react'
import { useWindowScroll } from '@mantine/hooks';
import {BiUpArrowAlt} from 'react-icons/bi'
const ScrollTop = () => {
    const [scroll, scrollTo] = useWindowScroll();
    return (
        <div className='fixed cursor-pointer bottom-10 right-5 p-2 text-white rounded-full bg-indigo-600'>
            <BiUpArrowAlt className='text-3xl' onClick={()=>scrollTo({ y: 0 })}/>
        </div>
    )
}

export default ScrollTop