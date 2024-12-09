import { Outlet } from 'react-router-dom'
import Home from '../Home/Home'
import Navbar from '../navbar/navbar'

const Master = () => {


    return (
        <div className='text-center'>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Master