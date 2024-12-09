import { createContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";



export const Context = createContext(null);


const ContextProvider = (props) => {


   const [userList, setUserList] = useState([])

    const getData = async() => {
        try {
            const response = await getDocs(collection(db, "users"));
            const users = response.docs.map((doc) =>( {
                Id: doc.id,
                ...doc.data()}))
            setUserList(users);
        }
        catch (error) {

        }
    }




    useEffect(() => {
    getData()
    }, [])  
  



    
    return (
        <>
        <Context.Provider value={{userList}}>{props.children}</Context.Provider>
        </>
    )
}

export default ContextProvider