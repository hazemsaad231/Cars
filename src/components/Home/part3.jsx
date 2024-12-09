import { Rent } from "./data"
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Aos from "aos";
import 'aos/dist/aos.css';
const Three = () => {


    useEffect(() => {
        Aos.init({
          duration: 1000,  // مدة التأثير
          once: true,  // التأثير يتم مرة واحدة فقط عند التمرير
        });
      }, []);




    return (
        <>
        <div>
        <h1 className='font-semibold text-3xl mt-16 mb-16 text-yellow-600'>Our special car rental offers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 place-items-center m-auto w-[100%]">
 {Rent.map((item) => (
            <div key={item.id} data-aos="zoom-in" >
<div className="flex flex-col">
   <div className='flex pt-2'>
                    <img src={item.img} alt="image" className='w-96 h-72 m-auto rounded-l-lg  hover:scale-110'  />
                </div>    
                <div className='flex flex-col pt-2'>
                    <h1 className="font-bold text-xl text-yellow-600">{item.title}</h1>
                    <p className='font-serif text-sm w-60 h-36 p-2 text-center m-auto '>{item.text}</p>
                    <div className='flex gap-4 justify-center'>
                        <h1 className='font-semibold line-through'>${item.price}</h1>
                        <h1 className='font-semibold text-yellow-600'>${item.newPrice}</h1>

                    </div>
                    <div className='flex justify-center mt-4'>
                        <button className=' border-2 border-yellow-600 w-max px-4 py-1 text-center text-yellow-600 rounded-lg hover:bg-yellow-600 hover:text-white m-auto mb-4'>Book Now</button>
                    </div>
                </div>
</div>
             
            </div>
        ))}

        </div>
   
        </div>

        <div className='text-start flex justify-center mt-16'> 
    <button className='m-auto border-2 border-yellow-600 text-xl text-yellow-600 h-[4vh] rounded-lg px-6 hover:bg-yellow-600 hover:text-white'><Link to={'/home/allcars'}> Show All Cars</Link></button>
  </div>


        </>
    )
}

export default Three