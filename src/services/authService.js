import { signInWithPopup,GoogleAuthProvider,signOut } from "firebase/auth";
import {auth} from "./firebase";

const provider= new GoogleAuthProvider();

export const signInwithGoogle= async() =>{
    try{
        const data=await signInWithPopup(auth,provider);
        return data.user;
    }catch(error){
        console.log("Google Sign-in error: ",error);
    }
}

export const logout= async()=>{
    try{
        await signOut(auth);
    }catch(error){
        console.log("Logout error: ",error);
    }
}