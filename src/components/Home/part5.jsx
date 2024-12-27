import Names from './data'
import star from '../../../src/assets/img/star.png'
import { useEffect } from 'react';
import Aos from "aos";
import 'aos/dist/aos.css';


const Five = () => {



    useEffect(() => {
        Aos.init({
          duration: 1000,  // مدة التأثير
          once: true,  // التأثير يتم مرة واحدة فقط عند التمرير
        });
      }, []);





    return (

        <>

<h1 className='font-semibold text-4xl mt-24 mb-10' style={{ fontFamily: "arial" }}> <span className='text-blue-700'>Tweets</span> of some users</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>

{Names.map((item) => (
    <div key={item.id} className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  rounded-lg  shadow-2xl m-[5%] mb-4'data-aos="zoom-in">

<div>

    <img src={item.image} alt="image" className='w-full h-full m-auto rounded-l-lg  hover:scale-110'  />
    </div>
<div className='flex flex-col pt-2'><h1>{item.num} stars</h1>
        <div className='flex justify-center'>
                {item.star.map((_, index) => (
                        <img 
                            key={index} 
                            src={star} 
                            alt="Star" 
                            style={{ width: '20px', marginRight: '5px' }} 
                            
                        />
                    ))}
        </div>

        <p  className='font-serif w-40 p-2 text-center m-auto '>{item.discription}</p>

        <br />

        <h3 className='text-center px-2'>{item.name}</h3>
        <p className='text-gray-500 text-sm text-center px-2 pb-2'>{item.date}</p>
        </div>
       
       
     
       
    </div>
)   )}
</div>
        
        
        </>
    )
};

export default Five