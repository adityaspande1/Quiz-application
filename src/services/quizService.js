import {db } from './firebase';
import { collection,getDoc,addDoc } from 'firebase/firestore';


export const getQuizzes= async()=>{
    const quizzSnapshot= await getDoc(collection(db,"quizzes"));
    return quizzSnapshot.docs.map(doc=>({id:doc.id,title:doc.data().title}));
};


export const fetchQuizById= async(id)=>{
    const quizDoc= await getDoc(collection(db,"quizzes",id));

    return quizDoc.exists()?{id:quizDoc.id,...quizDoc.data()}:null;
};

export const createQuiz= async(data)=>{
    try{
        await addDoc(collection(db,"quizzes"),data);
    }catch(error){
        console.log("Error createing quiz: ",error);
    }
};

