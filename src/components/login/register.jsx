import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCarSport } from "react-icons/io5";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";
export default function Register() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "admin",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log("User registered successfully:", response);

      const db = getFirestore();
      await setDoc(doc(db, "users", response.user.uid), {
        firstName: data.first_name,
        lastName: data.last_name,
        role: data.role,
      });



      toast("Register successfully");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(`Failed to register: ${error.message}`);
    }
  };

  return (
    <>
    <ToastContainer />
      <div className="flex flex-col justify-center">
        <div className="m-auto border-2 w-max py-3 px-10 rounded-lg shadow-3xl bg-transparent">
          <div className="p-8">
            <IoCarSport className="w-20 h-20 m-auto text-black" />

            <h3 className="text-gray-800 text-lg text-start">
              Create new account
            </h3>
            <h1 className="font-bold text-2xl mb-4">Register</h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                "& > :not(style)": { m: 2, width: "32ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="flex gap-3 ">
                <div>
                  <TextField
                    id="outlined-basic"
                    label="firstName"
                    variant="outlined"
                    {...register("first_name", { required: true })}
                    className="bg-transparent"
                  />
                  {errors.first_name && (
                    <span className="text-red-400 text-start text-sm">
                      first name is required
                    </span>
                  )}
                </div>

                <div className="">
                  <TextField
                    id="outlined-basic"
                    label="lastName"
                    variant="outlined"
                    {...register("last_name", { required: true })}
                    className="bg-transparent"
                  />
                  {errors.last_name && (
                    <span className="text-red-400 text-start text-sm">
                      last name is required
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  className="bg-transparent"
                />
                {errors.email && (
                  <span className="text-red-400 text-start text-sm">
                    {errors.email.message}
                  </span>
                )}

                <div className="mt-4 flex flex-col">
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    type="password"
                    variant="outlined"
                    {...register("password", { required: "Password is required" })}
                    className="bg-transparent"
                  />
                  {errors.password && (
                    <span className="text-red-400 text-start text-sm">
                      {errors.password.message}
                    </span>
                  )}
                </div>


                <div className="mt-4 flex flex-col">
                  <TextField
                    id="outlined-basic"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    {...register("confirm_password", { required: "confirm password is required" })}
                    className="bg-transparent"
                  />
                  {errors.password && (
                    <span className="text-red-400 text-start text-sm">
                      {errors.password.message}
                    </span>
                  )}
                </div>



              </div>
            </Box>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="bg-black text-white p-2 rounded-lg mt-4"
              >
                Register
              </button>
              <button
                className="border border-black p-2 rounded-lg mt-4 text-black"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}









