import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Master from './components/login/master'
import Details from './components/cars/carDetails'
import AllCars from './components/cars/allCars'
import AddCar from './components/addcar/addCar'
import Auth from './components/login/auth'
import Login from './components/login/login'
import Register from './components/login/register'
function App() {
 
  let route = createBrowserRouter([

{
  path: "/",
  element: <Auth />,
  errorElement: <div>Error</div>,
  children: [
    {index: true, element: <Login />},
    {path: "login", element: <Login />},
    {path: "register", element: <Register/>},
  ]
},


{
  path: "/home",
  element: <Master />,
  errorElement: <div>Error</div>,
  children: [
    {index: true, element: <Home />},
    {path: "home", element: <Home />},
    {path: "allcars", element: <AllCars/>},
    {path: "details/:id", element: <Details />},
    {path: "addCar", element: <AddCar/>},
    {path: "addCar/:id", element: <AddCar/>},


]}

]);

  return (
    <>
    <div>
    <RouterProvider router={route} />
    </div>
    
    </>
  )
}

export default App
