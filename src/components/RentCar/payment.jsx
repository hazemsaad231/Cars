import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Typography, Grid, TextField , Autocomplete} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase/firebase';
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



 const options = [25,50,75,100]
function Payment() {

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);


const Id = localStorage.getItem("Id");
const carDetails = JSON.parse(localStorage.getItem("RentDetails"));

console.log(carDetails);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe لم يتم تحميله بعد. حاول مرة أخرى.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    console.log(cardElement);


    if (cardElement) {
      setLoading(true);
      const { error, token } = await stripe.createToken(cardElement);


     

      if (error) {
        toast.error(error.message);
        return;
      }

        if (!Id) {
          toast.error("Please log in to place an order.");
          return;
        }

        const id = Id;
        const data = {
          token: 'tok_visa',
          delivery_address: {
           fullName: event.target.fullName.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            city: event.target.city.value,
            address: event.target.address.value,
            PickupDate : event.target.PickupDate.value,
            ReturnDate : event.target.ReturnDate.value,
            PartialPayment: event.target.PartialPayment.value,
            building: 1,
            floor: 1,
            apartment: 1,
            additional_info: 'test info',
            location: {
              type: "Point",
              coordinates: [30.0444, 31.2357],
            },
          },
          carDetails,
        };

        try {
          // إضافة بيانات الطلب إلى Firestore
          const orders = collection(db, "Rent_orders");
          await addDoc(orders, {
            userId: id,
            token: token?.id,
            delivery_address: data.delivery_address,
            carDetails: data.carDetails,
            timestamp: new Date(),
          });

         

          setTimeout(() => {
            toast.success("successful reservation", { autoClose: 2000 });
          },2000)

          setTimeout(() => {
            navigate("/home/complete", { state: {carDetails }});
          }, 4500);

        } catch (error) {
          console.error("error", error);
          toast.error("Failed to add order. Please try again.");
        } 
      }
    } 
  
  
  return (
    <>
      <ToastContainer />
  
        <div className='mx-4'>
          <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>

          <div className="text-center rounded-lg shadow-2xl bg-gradient-to-r from-gray-50 to-transparent">

<div className="bg-transparent p-8 text-center rounded-lg shadow-xl border-2">
  <Typography variant="h5" gutterBottom sx={{ color: 'black',fontFamily: 'cursive' }}>
    Car Rental Form
  </Typography>
  <Grid item xs={8}>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3'>
      <TextField
        name="fullName"
        label="Full Name"
        fullWidth
        margin="normal"
      />

      <TextField
        name="email"
        label="Email"
        fullWidth
        variant="standard"
        margin="normal"
      />

      <TextField
        name="phone"
        label="Phone"
        fullWidth
        margin="normal"
      />

      <TextField
        name="city"
        label="City"
        fullWidth
        variant="standard"
        margin="normal"
      />

      <Autocomplete
                  name="PartialPayment"
                  label="Partial Payment"
                  fullWidth
                  variant="standard"
                  margin="normal"
                  options={options}
                  renderInput={(params) => <TextField {...params} label="Partial Payment" />}
                  sx={{mt:2}}
           />

      <TextField
        name="address"
        label="Address"
        fullWidth
        variant="standard"
        margin="normal"
      />  

  


      <TextField
        name="PickupDate"
        label="Pickup Date"
        type="date"
        fullWidth
        margin="normal"
      />

      <TextField
        name="ReturnDate"
        label="Return Date"
        type="date"
        fullWidth
        variant="standard"
        margin="normal"
      />

    
    </div>
  </Grid>
</div>




<div className="bg-transparent p-2 m-4 text-center rounded-lg shadow-xl">
              <Typography variant="h5" gutterBottom sx={{ letterSpacing: 4 , color: "black", fontFamily: "cursive" }}>
                Payment Info
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <Box sx={{ border: '1px solid #ccc', borderRadius: 1, padding: 2 }}>
                    <CardElement options={{ hidePostalCode: true }} />
                  </Box>
                </Grid>
              </Grid>
            </div>

        


            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ m: 2, width: 300 }}
              disabled={!stripe}
            >
              {loading ? "Processing..." : "PROCEED TO CHECKOUT"}

            </Button>

</div>

   
          </Box>
        </div>
    
    </>
  );
}

export default Payment;
