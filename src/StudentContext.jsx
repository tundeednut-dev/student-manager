import { useState, createContext, useContext, useEffect } from "react";

export const studentContext = createContext()

export const useCreateStudent = ()  => useContext(studentContext)

export const StudentContext = ({children}) => {

const [studentList, setStudentList] = useState([])
const [edStudent, setEdStudent] = useState({})


const storeStudent = (student) => {
    const studentWithId = {...student, id: Date.now()}
    const updatedList = [...studentList, studentWithId]
    setStudentList(updatedList)
   localStorage.setItem("student", JSON.stringify(updatedList))
}

useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("student")) || [];
    setStudentList(stored)
},[])

return(
<studentContext.Provider value = {{studentList, storeStudent, edStudent, setEdStudent, setStudentList}}>{children}</studentContext.Provider>
)
}