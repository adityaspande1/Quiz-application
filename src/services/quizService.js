import { db } from "./firebase"
import { collection, addDoc, getDocs } from "firebase/firestore"

export const createQuiz = async (quizData) => {
  try {
    const docRef = await addDoc(collection(db, "quizzes"), quizData)
    return docRef.id
  } catch (error) {
    console.error("Error creating quiz:", error)
    throw error
  }
}

export const getQuizzes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "quizzes"))
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error fetching quizzes:", error)
    throw error
  }
}

export const saveQuizScore = async (userId, quizId, score) => {
  try {
    await addDoc(collection(db, "scores"), {
      userId,
      quizId,
      score,
      timestamp: new Date(),
    })
  } catch (error) {
    console.error("Error saving score:", error)
    throw error
  }
}

