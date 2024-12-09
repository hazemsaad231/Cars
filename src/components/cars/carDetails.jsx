import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Details = () => {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState({});

  console.log(id)


  
  useEffect(() => {
    const fetchCarDetails = async () => {
      const docRef = doc(db, "cars", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCarDetails(docSnap.data());
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
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-50">
      <div className="container flex flex-col justify-center items-center m-auto">
       

        {/* Details Section */}
        <div className="w-3/6 h-[60vh] bg-white shadow-2xl p-8">
          <div className="text-center mb-8">
            <span className="inline-block bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-medium uppercase tracking-wider">
              Why Choose Us
            </span>
            <h1 className="text-4xl font-extrabold text-gray-800 mt-4 leading-tight">
              Elevate Your Ride with Our Premium Cars
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 m-auto">
            <p className="text-lg font-semibold text-gray-800">
            <strong>car:</strong>   {carDetails.car}
            </p>
           
              <p className="text-gray-600 text-lg">
                <strong>fuel Type:</strong> {carDetails.carType}
                </p>

            <p className="text-gray-600 text-lg">
              <strong>Color:</strong> {carDetails.car_color}
            </p>
            <p className="text-gray-600 text-lg">
              <strong>Model Year:</strong> {carDetails.car_model_year}
            </p>
            <p className="text-gray-600 text-lg">
              <strong>Price:</strong> ${carDetails.price}
            </p>
            <p className="text-gray-600 text-lg">
              <strong>Mileage:</strong> {carDetails.mileage}
            </p>
            <p className="text-gray-600 text-lg">
              <strong>Transmission:</strong> {carDetails.Transmission}
            </p>
            <p className="text-gray-600 text-lg">
              <strong>Horsepower:</strong> {carDetails.Horsepower}
            </p>
            
          </div>
          <div className="mt-8 text-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all">
              Rent This Car Now
            </button>
          </div>
        </div>

 {/* Slider Section */}
 <div className="w-3/6 h-full">
          <Slider {...settings}>
            {Array.isArray(carDetails.img) &&
              carDetails.img.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Car"
                  className="w-80 h-[60vh] object-cover rounded-r-lg shadow-2xl"
                />
              ))}
          </Slider>
        </div>





      </div>
    </div>
  );
};

export default Details;


