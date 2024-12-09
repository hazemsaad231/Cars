import { Link } from 'react-router-dom';
import logo from '../../../src/assets/img/RENT_MUSICAL_BLUE-logo-4631FB248C-seeklogo.com.png'
import Close from '../Home/close';
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { useState } from 'react';




const Navbar = () => {

   const admin = localStorage.getItem('role');

   const [isDarkMode, setIsDarkMode] = useState(false);

   const toggleMode = () => {
     if (isDarkMode) {
       document.body.style.backgroundColor = 'white';
       document.body.style.color = 'black';
     } else {
       document.body.style.backgroundColor = 'black';
       document.body.style.color = 'white';
     }
     setIsDarkMode(!isDarkMode); // تحديث الحالة
   };
 



    return (
        <div className="flex flex-row justify-between w-[100%] px-10">


<div className='flex flex-row mr-20 mt-5 gap-4'>
        <img src={logo} alt="logo" className='w-10 h-10' id='logo'/> 
        <h2 className='text-xl  text-start text-blue-400 font-extrabold mt-1 hover:text-blue-800'>RENTCARS</h2>
        {isDarkMode ? <MdOutlineLightMode className='text-2xl mt-1 cursor-pointer' onClick={toggleMode} /> : <MdOutlineDarkMode className='text-2xl mt-1 cursor-pointer' onClick={toggleMode} />}


        </div>


           <ul className="flex gap-4 justify-center m-6 cursor-pointer font-bold t text-lg text-blue-500">
            <li><Link to="home">Home</Link></li>
            <li><Link to="allcars">Cars</Link></li>
            {admin === 'hazemsaad231@gmail.com' ? <li><Link to="addCar">addCar</Link></li>:null}
            <li><a href="#contact">Contact Us</a></li>

            <li><Close/></li>


           

    
            
            

          
           </ul>
        

        </div>
    );    
};    
export default Navbar