import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import view from "../../assets/img/view.mp4";
import { Link } from "react-router-dom";
import Loader from "../load/load";

const Details = () => {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState({});

 
  localStorage.setItem("id", id);
  localStorage.setItem("isBooked", carDetails.isBooked);


const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCarDetails = async () => {
      const docRef = doc(db, "cars", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCarDetails(docSnap.data());
        setLoading(false);
      } else {
        console.log("No such document!");
      }
    };

    fetchCarDetails();      

  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false
  };

  return (



    
<div>

{ loading ? <Loader/>:
      <div className="flex gap-4 justify-center p-4 py-8 m-auto ">


<div className='w-1/2 hidden sm:hidden md:block lg:block xl:block'data-aos="fade-left">
   <video src={view} autoPlay loop muted  disablePictureInPicture className='rounded-l-xl object-cover h-full ' ></video>
</div>



        {/* Details Section */}
        <div className=" w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 bg-white shadow-2xl rounded-r-xl  flex flex-col" data-aos="fade-left">
          <div className="text-center">

            


            <div className="h-full">
          <Slider {...settings}>
            {Array.isArray(carDetails.img) &&
              carDetails.img.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Car"
                  className="w-[30vw] sm:w-[30vw] md:w-[35vw] lg:w-[50vw] xl:w-[50vw] h-[30vh] sm:h-[30vh] md:h-[35vh] lg:h-[50vh] xl:h-[50vh] rounded-r-lg shadow-2xl"
                />
              ))}
          </Slider>
          <div>
<h1 className="text-xl font-extrabold text-gray-800 mt-8 mb-4 leading-tight">
              Elevate Your Ride with Our Premium Cars
            </h1>
</div>

        </div>


           
          </div>

          <div className="grid grid-cols-2 gap-3 m-auto">
            <p className="text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg text-gray-600">
            <strong>car:</strong>   {carDetails.car}
            </p>
           
              <p className="text-gray-600 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg">
                <strong>fuel Type:</strong> {carDetails.carType}
                </p>

            <p className="text-gray-600 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg">
              <strong>Color:</strong> {carDetails.car_color}
            </p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg">
              <strong>Model Year:</strong> {carDetails.car_model_year}
            </p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg">
              <strong>Price:</strong> ${carDetails.price}
            </p>
            
            <p className="text-gray-600 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg">
              <strong>Mileage:</strong> {carDetails.mileage}
            </p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg">
              <strong>Horsepower:</strong> {carDetails.Horsepower}
            </p>
            <p className="text-gray-600 text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg">
              <strong>Transmission :</strong> {carDetails.Transmission}
            </p>
          </div>
      
         
          
          <div className="mt-4 text-center mb-2">
            <button className="bg-blue-600 text-white px-12 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all mx-2">
              <Link to={`/home/buy/${id}`}>buy</Link>
            
            </button>
          </div>
        </div>


  



      </div>

  
}

      </div>

  );
};

export default Details;


