 import Navbar from "../components/Navbar"
 import {Link} from "react-router-dom"
 import { useStudentContext } from "../StudentContext"

 function StudentList() {
    const {setEdStudent, studentList, setStudentList} = useStudentContext()

    const handleDelete = (stu) => {
      setStudentList((prev) => {
        const newList2 = prev.filter((student) => (
        student.id !== stu.id
      ))
            localStorage.setItem("student", JSON.stringify(newList2))
           return newList2
      })
      
    }

  
    const firstNames = studentList.map((entry, index) => (
        <tr key={index}>
        {Object.values(entry).map((value, i) => {
           return <td key={i} className="px-4 py-2 border-b">{value}</td>
 })}
          <td><Link to="/edit" onClick={() => setEdStudent(entry)} className="px-3 py-2 shadow font-semibold ml-2 mr-3">Edit</Link></td>
          <td><button onClick={() => handleDelete(entry)} className="px-3 py-2 shadow font-semibold">Delete</button></td>
        </tr>
 ))

    return (
  <>
    <div className="bg-gray-300 min-h-screen">
      <Navbar />

      {studentList.length ? (
        <div className="bg-white w-full max-w-6xl mt-10 mx-auto rounded-lg shadow-lg px-4 sm:px-6 md:px-10 py-6 sm:py-8 overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b">First Name</th>
                <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b">Last Name</th>
                <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b">Date of Birth</th>
                <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b">Gender</th>
                <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b">Age</th>
                <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b">Country</th>
                <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b">Email</th>
                <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b">Phone</th>
                <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b">Course</th>
                <th className="px-2 sm:px-4 py-2 text-left text-xs sm:text-sm font-semibold text-gray-700 border-b">ID</th>
              </tr>
            </thead>
            <tbody>
              {firstNames}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-center text-base sm:text-lg font-medium">Please Fill In A Student</p>
        </div>
      )}
    </div>
  </>
);

 }
 
 export default StudentList