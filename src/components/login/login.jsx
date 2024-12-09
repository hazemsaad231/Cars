import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoCarSport } from "react-icons/io5";
import { signInWithEmailAndPassword , signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { auth } from "../firebase/firebase";
import { FaGoogle } from "react-icons/fa6";

const Login = ()=>{
 


  let navigate = useNavigate();


  const { register, handleSubmit, formState: { errors } } = useForm();
  
 
   const onSubmit = async (data) => {
     try {
       const response = await signInWithEmailAndPassword(auth, data.email, data.password);
       toast("Login successful");
         setTimeout(() => {
           navigate("/home");
         }, 2000);
       localStorage.setItem('role',response.user.email);
       console.log(response.user.email);
     } catch (error) {
       console.error("Error:", error);
       toast.error(error.response?.data?.message || "Failed to login. Please try again.");
     } finally {
      
     }
   };


   const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // تسجيل الدخول باستخدام حساب جوجل
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in via Google: ", user);

      // هنا يمكنك إرسال المستخدم إلى الصفحة الرئيسية أو الصفحة المطلوبة بعد تسجيل الدخول
    } catch (error) {
      setLoginError("Google login error: " + error.message);
    }
  };






  return (
    <>
    <ToastContainer/>
      <div className=' flex flex-col justify-center'>
 <div className='m-auto border-2 w-max p-14  rounded-lg shadow-3xl bg-transparent'>
          <div className="p-8">
            <IoCarSport className="w-20 h-20 m-auto text-black" />  
          </div>

          <h3 className="text-black text-lg text-start">Welcome back!</h3>
          <h1 className="font-bold text-black text-2xl mb-4">Login to your account</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 2, width: '24ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  {...register("email", {
                    required: 'Email is required',
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: 'Please enter a valid email'
                    }
                  })}
                  className='bg-transparent'
                />
                {errors.email && <span className='text-red-400 text-start text-sm'>Email is required</span>}

                <div className='mt-4'>
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    type="password"
                    variant="outlined"
                    {...register("password", {
                      required: 'Password is required',
                    })}
                    className='bg-transparent'
                  />
                  {errors.password && <span className='text-red-400 text-start text-sm'>Password is required</span>}
                </div>
              </div>
            </Box>

            <div className='flex flex-col gap-2'>
              <button
                type="submit"
                className='bg-black border text-white p-2 rounded-lg mt-4 '
              >
                Login
              </button>
              <button
                className='border border-black p-2 rounded-lg mt-4 text-black'
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>

            <div>
            <button onClick={handleGoogleLogin} className='border bg-black   p-3 px-16 rounded-lg mt-4 text-white text-center flex'>Login with Google <span className='mt-1 ml-2'><FaGoogle /></span>  </button>
            </div>
          </form>
        </div>

      </div>
      </>
  );
}

export default Login;










 








