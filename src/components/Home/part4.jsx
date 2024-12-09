import yser from '../../../src/assets/img/yser.png'
import message from '../../../src/assets/img/message.png'
import chat from '../../../src/assets/img/chat.png'
import newImage from '../../../src/assets/img/new.mp4'
import { useEffect } from 'react';
import Aos from "aos";
import 'aos/dist/aos.css';


const Four = () => {


   useEffect(() => {
      Aos.init({
        duration: 1000,  // مدة التأثير
        once: true,  // التأثير يتم مرة واحدة فقط عند التمرير
      });
    }, []);




    return (
       <>
       
       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 place-items-center m-auto w-[100%] mt-10' >

<div className='flex flex-col' data-aos="zoom-in" >
 <div className=' border-2 border-blue-500  w-max px-4 py-1 text-center text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white m-auto mb-4'>WHY CHOOSE US</div>
  <h1 className='font-serif text-3xl mb-5'>We offer the best experience with our  rentalcars</h1>
  <div className='flex flex-col gap-3'>
  <div className='flex gap-2'> <img src={yser} alt="user"/> <div><h1 className='text-lg font-semibold text-start'>Best price guaranteed</h1>  <p className='font-serif text-gray-500'>Find a lower price? Well refund you 100% of the difference.</p></div> </div>
  <div className='flex gap-2'> <img src={message} alt="doors"/> <div><h1 className='text-lg font-semibold text-start'>24 hour car delivery </h1>  <p className='font-serif text-gray-500'>Book your car anytime and we will deliver it directly to you.</p></div>   </div>
  <div className='flex gap-2'> <img src={chat} alt="air"/> <div><h1 className='text-lg font-semibold text-start'>Best price guaranteed </h1>  <p className='font-serif text-gray-500'>Find a lower price? Well refund you 100% of the difference.</p></div></div>
  <div className='flex gap-2'> <img src={yser} alt="frame"/> <div><h1 className='text-lg font-semibold text-start'>24/7 technical support</h1>  <p className='font-serif text-gray-500'>Have a question? Contact Rentcars support any time when you have problem.</p></div>  </div>
  </div>
  </div> 
  <div className='mt-20'>
   <video src={newImage} autoPlay loop muted  disablePictureInPicture className='rounded-l-xl' data-aos ="zoom-in" ></video>
</div>
</div>
       
       
       
       </>
    )
}        

export default Four