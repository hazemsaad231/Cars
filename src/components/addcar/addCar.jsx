import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { db, collection, addDoc } from "../firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";


const AddCar = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarData = async () => {
      if (id) {
        try {
          const docRef = doc(db, "cars", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const carData = docSnap.data();

            // تحويل المصفوفة إلى نص مفصول بفواصل
            if (Array.isArray(carData.img)) {
              carData.img = carData.img.join(", ");
            }

            Object.keys(carData).forEach((key) => {
              setValue(key, carData[key]);
            });
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching car data: ", error);
        }
      }
    };

    fetchCarData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {

      const imagesArray = data.img.split(",").map((url) => url.trim());

      
      const formattedData = { ...data, img: imagesArray };

      if (id) {
        const docRef = doc(db, "cars", id);
        await updateDoc(docRef, formattedData);
        toast.success("Car data updated successfully!");
        console.log("Car data updated successfully!");
        setTimeout(() => {
          navigate('/home/allcars');
        }, 2000);
      } else {
        await addDoc(collection(db, "cars"), formattedData);
        console.log("Car data added successfully!");
        toast.success("Car added successfully!");
        setTimeout(() => {
          navigate("/home/allcars");
        }, 2000);
      }
    } catch (error) {
      console.error("Error saving car data: ", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
      <div className="shadow-2xl w-max m-auto mt-10">
        <h2 className="text-xl text-center font-serif tracking-wider">
          {id ? "Update Car" : "Add a New Car"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-max p-10 m-auto font-serif text-gray-500">
          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col">
              <label className="text-start">Car Name</label>
              <input
                type="text"
                className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
                {...register("car", { required: "Car name is required" })}
              />
              {errors.car && <p className="text-red-400 text-sm">{errors.car.message}</p>}
            </div>

            {/* باقي الحقول */}
            <div className="flex flex-col">
              <label className="text-start">Images</label>
              <input
                type="text"
                className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
                {...register("img", {
                  required: "At least one image URL is required",
                  validate: (value) => value.includes(",") || "Separate URLs with commas",
                })}
              />
              {errors.img && <p className="text-red-400 text-sm">{errors.img.message}</p>}
            </div>

            {/* الحقول الأخرى كما هي */}
            <div className="flex flex-col">
              <label className="text-start">Car Type</label>
              <input
                type="text"
                className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
                {...register("carType", { required: "Car type is required" })}
              />
              {errors.carType && <p className="text-red-400 text-sm">{errors.carType.message}</p>}
            </div>

            <div className="flex flex-col">
              <label className="text-start">Car Color</label>
              <input
                type="text"
                className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
                {...register("car_color", { required: "Car color is required" })}
              />
              {errors.car_color && <p className="text-red-400 text-sm">{errors.car_color.message}</p>}
            </div>


            <div className = 'flex flex-col'>
           <label className = 'text-start'>Car Model Year</label>
           <input
            type="text"
            className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
            {...register("car_model_year", { required: "Model year is required" })}
          />
          {errors.car_model_year && <p className = "text-red-400 text-sm">{errors.car_model_year.message}</p>}
        </div>


        <div className = 'flex flex-col'>
          <label className = 'text-start'>Price</label>
          <input
            type="text"
            className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
            {...register("price", { required: "Price is required" })}
          />
          {errors.price && <p className = "text-red-400 text-sm">{errors.price.message}</p>}
        
        </div>



            <div className = 'flex flex-col'>
          <label className = 'text-start'>Mileage</label>
          <input
            type="text"
            className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
            {...register("mileage", { required: "Mileage is required" })}
          />
          {errors.mileage && <p className = "text-red-400 text-sm">{errors.mileage.message}</p>}
        </div>

        <div className = 'flex flex-col'>
          <label className = 'text-start'>Transmission</label>
          <input
            type="text"
            className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
            {...register("transmission", { required: "Transmission is required" })}
          />
          {errors.transmission && <p className = "text-red-400 text-sm">{errors.transmission.message}</p>}
        </div>

        <div className = 'flex flex-col'>
          <label className = 'text-start'>Horsepower</label>
          <input
            type="text"
            className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
            {...register("Horsepower", { required: "Horsepower is required" })}
          />
          {errors.Horsepower && <p className = "text-red-400 text-sm">{errors.Horsepower.message}</p>}
        </div>

        

        <div className = 'flex flex-col'>
          <label className = 'text-start'>evaluation</label>
          <input
            type="text"
            className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
            {...register("evaluation", { required: "evaluation is required" })}
          />
          {errors.evaluation && <p className = "text-red-400 text-sm">{errors.evaluation.message}</p>}
        </div>


        <div className = 'flex flex-col'>
          <label className = 'text-start'>reviews</label>
          <input
            type="text"
            className="w-60 h-11 m-auto border rounded outline-blue-500 font-sans"
            {...register("reviews", { required: "reviews is required" })}
          />
          {errors.reviews && <p className = "text-red-400 text-sm">{errors.reviews.message}</p>}
        </div>







          </div>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg mt-4">
            {id ? "Update Car" : "Add Car"}
          </button>
        </form>
      </div></div>
    </>
  );
};

export default AddCar;
