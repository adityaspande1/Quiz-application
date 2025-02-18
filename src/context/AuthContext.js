import { createContext,useContext,useState,useEffect, use } from "react";
import {auth} from "../services/firebase";
import {onAuthStateChanged} from "firebase/auth";

const AuthContext=createContext(null);

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser);
        return () => unsubscribe();
      }, []);
    
      return (
        <AuthContext.Provider value={{ user }}>
          {children}
        </AuthContext.Provider>
      );
}


export const useAuth=()=>{
    useContext(AuthContext);
}