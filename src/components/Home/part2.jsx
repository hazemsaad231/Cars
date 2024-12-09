import air from '../../../src/assets/img/air.png'
import frame from '../../../src/assets/img/frame.png'
import {Link} from 'react-router-dom'
import { db, collection, getDocs } from "../firebase/firebase";
import { useEffect , useState } from 'react'
import star from '../../../src/assets/img/star.png'
import { FaUserAlt } from "react-icons/fa";
import Aos from "aos";
import 'aos/dist/aos.css';
const Two = () => {


    const [data,setData] = useState([])
    const [value,setValue] = useState('')
    
    useEffect(() => {
      Aos.init({
        duration: 1000,  // مدة التأثير
        once: true,  // التأثير يتم مرة واحدة فقط عند التمرير
      });
    }, []);
    
    
    const search = () => {
        
        return data.filter((item) =>
            item.car.toUpperCase().includes(value.toUpperCase())); 
      };
    
        useEffect(() => {
          const fetchCars = async () => {
            const querySnapshot = await getDocs(collection(db, "cars"));
            const carsList = querySnapshot.docs.map((doc) =>( {
              Id: doc.id,
              ...doc.data()}));
              let cars = carsList.slice(0,3)
            setData(cars);
            console.log(cars);
          
          localStorage.setItem("cars", JSON.stringify(carsList));
       
      
           
          };
      
          fetchCars();
        }, []);
    





    return(
    <>
   

    <div>
<h2 className='text-3xl font-bold mt-20'>Most Popular Cars</h2>
<div className='mt-10'>
    <input type="text" placeholder='Search' className='w-[65%] h-[4vh] mt-4 shadow-2xl border-2 border-gray-300 p-1  rounded-l-lg outline-blue-400' value={value} onChange={(e)=>setValue(e.target.value)}/>
    <button className='bg-blue-600 text-white h-[4vh] rounded-r-lg w-[16vw]'>search</button>
    </div>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 w-[80%] m-auto mt-5  gap-4  place-items-center'>
    
    {search().map((el)=>(
 <div key={el.id} className='flex flex-col text-center border-2 mb-4 shadow-2xl w-[100%] gap-2 justify-center rounded-t-xl' data-aos="zoom-out">

 <img src={el.img[0]} alt="image" className='w-full h-60 m-auto mb-5 rounded-t-xl hover:scale-110 shadow-xl' />
 <h2 className='text-start font-medium text-2xl mt-2 ml-6 mb-2'>{el.car}</h2>

 <div className='flex gap-.5 px-3'> 
<img src={star} alt="" className='w-5 h-5'/>
    <span className='font-bold'>{el.evaluation}</span>
    <span className=' font-thin'> ({el.reviews} reviews)</span>
</div>


 <div className='flex justify-between px-3'>

 <div className='flex px-1 gap-1'>
   <FaUserAlt className='text-xl'/>
        <span className='text-gray-600 text-sm sm:text-sm md:text-md lg:text-md xl:text-md font-sans'>4 Passanger</span>
    </div>

    <div className='flex gap-1'>
        <img src={air} alt="" className='w-5 h-6' />
        <span className='text-gray-600 text-sm sm:text-sm md:text-md lg:text-md xl:text-md'>Air condtioning</span>
    </div>
 </div>

 <div className='flex font-serif  justify-between px-3'>
    <div className='flex '> 
    <span className='text-gray-600 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg'> {el.carType}</span></div>
    <div className='flex ml-28'>
        <img src={frame} alt="" className='w-5 h-5' />
        <span className='text-gray-600  text-sm sm:text-sm md:text-md lg:text-md xl:text-md font-sans'>{el.car_model_year}</span>
    </div>
 </div>

<hr style={{ height: '2px', width: '100%', backgroundColor: 'gray', margin: 'auto'}}/>

 <div className='flex justify-between px-3 mt-4'>
     <h5 className='font-serif'>price</h5>
     <h5 className='font-bold'>{el.price}</h5>
 </div>
 <br />
 <button className='bg-blue-500 w-max m-auto rounded-lg p-3 mb-2 hover:bg-blue-800 text-white'><Link to={`/home/details/${el.Id}`}>view details</Link></button>
</div>
    ))}
    
         
    </div>
  
    <div className='text-start flex justify-center mt-16'> 
    <button className='m-auto border-2 border-gray-600 text-xl text-gray-400 h-[4vh] rounded-lg px-6 hover:bg-gray-600 hover:text-white'><Link to={'/home/allcars'}> Show All Cars</Link></button>
  </div>
  </div>
    </>
    )

}

export default Two