import { useState, createContext, useContext, useEffect } from "react";

export const StudentContext = createContext({})

export const useStudentContext = ()  => useContext(StudentContext)

export const StudentProvider = ({children}) => {

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
<StudentContext.Provider value = {{studentList, storeStudent, edStudent, setEdStudent, setStudentList}}>{children}</StudentContext.Provider>
)
}