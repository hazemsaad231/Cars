import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "../firebase/firebase";
import { Link } from "react-router-dom";
import air from '../../../src/assets/img/air.png'
import frame from '../../../src/assets/img/frame.png'
import { FaUserAlt } from "react-icons/fa";
import star from '../../../src/assets/img/star.png'
import { doc, deleteDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';




const AllCars = () => {
  const [cars, setCars] = useState([]);
  const [value,setValue] = useState('')
  const [open, setOpen] = React.useState(false);
  const [selectedDelete, setSelectedDelete] = useState(null);



  const fetchCars = async () => {
    const Allcars = await getDocs(collection(db, "cars"));
    const carsList = Allcars.docs.map((doc) =>( {
      id: doc.id,
      ...doc.data()}))

    setCars(carsList);
  localStorage.setItem("cars", JSON.stringify(carsList));


 

   
  };


  useEffect(() => {
    fetchCars();
  }, []);
  const role = localStorage.getItem("role");
  const search = () => {
        
    return cars.filter((item) =>
        item.car.toUpperCase().includes(value.toUpperCase())); 
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "cars", selectedDelete));
      // setCars(cars.filter((car) => car.id !== id));
      setOpen(false);
      fetchCars();
      toast.success("Car deleted successfully!");
    } catch (error) {
      console.error("Error deleting car: ", error);
    }
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setSelectedDelete(id);
  };


  return (
<>
<ToastContainer/>
    <div className="">
                <div> 
         <h2 className='text-4xl font-semibold p-8'>Most popular cars rental deals</h2>

         <div className='mt-10'>
    <input type="text" placeholder='Search' className='w-[45%] h-[4vh] mt-4 shadow-2xl border-2 border-gray-300 p-1  rounded-l-lg outline-blue-400' value={value} onChange={(e)=>setValue(e.target.value)}/>
    <button className='bg-blue-600 text-white h-[4vh] rounded-r-lg w-[16vw]'>search</button>
    </div>

    

         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-10 m-auto gap-4 w-[80%] place-items-center'>
         {search().map((el,index)=>(
 <div key={el.id||index} className='flex flex-col text-center border-2 mb-2 shadow-2xl w-[100%] gap-2 justify-between '>

<img
                      src={el.img[0]} // إضافة صورة افتراضية إذا لم توجد صورة
                      alt={el.car}
                      className="w-full h-60 mb-4 m-auto rounded-xl shadow-lg"
                    />


 <h2 className='text-start font-semibold text-xl mt-2 ml-3 mb-2'>{el.car}</h2>

<div className='flex gap-.5 px-3'> 
<img src={star} alt="" className='w-5 h-5'/>
    <span className='font-bold'>{el.evaluation}</span>
    <span className=' font-thin'> ({el.reviews} reviews)</span>
</div>


 <div className='flex justify-between px-3'>

 <div className='flex gap-1'>
      <FaUserAlt className='text-xl' />
        <span className='text-sm sm:text-sm md:text-md lg:text-md xl:text-md font-thin'>2 Passanger</span>
    </div>

    <div className='flex'>
        <img src={air} alt="" className='w-5 h-6' />
        <span className='text-sm sm:text-sm md:text-md lg:text-md xl:text-md font-thin'>Air condtioning</span>
    </div>
 </div>

 <div className='flex font-serif  justify-between px-3'>
    <div className='flex mx-1 '> 
    <span className='text-gray-600 font-thin text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg'> {el.carType}</span></div>
    <div className='flex ml-28'>
        <img src={frame} alt="" className='w-5 h-5' />
        <span className='text-sm sm:text-sm md:text-md lg:text-md xl:text-md font-sans'>{el.car_model_year}</span>
    </div>
 </div>

<hr style={{ height: '2px', width: '100%', backgroundColor: 'gray', margin: 'auto'}}/>

 <div className='flex justify-between px-3'>
     <h5 className='font-serif'>price</h5>
     <h5 className='font-bold'>{el.price}$</h5>
 </div>
 <br />
 {
role !== 'hazemsaad231@gmail.com' ?  <button className='bg-blue-500 w-max m-auto rounded-lg p-3 mb-3 hover:bg-blue-800 text-white'><Link to={`/home/details/${el.id}`}>view details</Link></button>
:<div className="flex gap-2 mx-2"><button className='bg-blue-500 w-full m-auto rounded-lg p-3 mb-3 hover:bg-blue-800 text-white'><Link to={`/home/addCar/${el.id}`}>update</Link></button>
<button className=' bg-red-500 w-full m-auto rounded-lg p-3 mb-3 hover:bg-red-800 text-white' onClick={() => handleClickOpen(el.id)}>delete</button>
</div>
 }

</div>

    ))}
  
  </div>
    </div>
    


    </div> 
  
    
<React.Fragment>
  <Modal open={open} onClose={() => setOpen(false)}>
    <ModalDialog variant="outlined" role="alertdialog">
      <DialogTitle>
        Confirmation
      </DialogTitle>
      <Divider />
      <DialogContent>
        Are you sure you want to delete?
      </DialogContent>
      <DialogActions>
        <Button variant="solid" color="danger" onClick={() => handleDelete()}>
            Delete
        </Button>
        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </DialogActions>
    </ModalDialog>
  </Modal>
</React.Fragment>


    
    
    </>  
    
  
  )

  }
            

export default AllCars;

