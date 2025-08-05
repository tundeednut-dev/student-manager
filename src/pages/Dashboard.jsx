import Navbar from "../components/Navbar"
import addStudentImg from "../assets/addStudentImg.jpg"
import studentListImg from "../assets/studentListLogo.jpg"
import { useStudentContext } from "../StudentContext"
import { Link } from "react-router-dom"

function Dashboard(){

  const {studentList} = useStudentContext()

  return(
    <>
    <Navbar/>
    <div className="w-screen min-h-screen">
  <div className="w-5/6 mb-6 bg-[#566082] p-5 mx-auto mt-7 rounded-2xl lg:w-1/2 lg:ml-[400px]">
    <h1 className="text-white font-semibold">Student Manager</h1>
    <p className="py-3 text-white font-semibold text-4xl">
      Add, update, and view student records — simple and fast.
    </p>
  </div>

<div className="flex flex-row space-x-12 px-5 mx-auto my-10 justify-center max-w-5xl">
<div className="rounded-xl px-8 py-4 lg:w-2/3 shadow-xl">
    <p className="text-2xl font-semibold mb-4">Total Students</p>
    <p className="text-2xl font-bold text-yellow-500">{studentList.length}</p>
</div>
<div className="rounded-xl px-8 py-4 lg:w-2/3 shadow-xl">
    <p className="text-2xl font-semibold mb-4">Total Students</p>
    <p className="text-2xl font-bold text-yellow-500">{studentList.length}</p>
</div>
</div>

  <div className="px-6 py-10 space-y-7 md:space-y-0 md:space-x-7 lg:mx-auto lg:w-5/6 flex flex-col md:flex-row">
    <Link
     to ="/regForm" 
     className="md:w-1/2 max-w-xl mx-auto"
     data-testId = "addStudent"
     >
    <div className=" rounded-3xl shadow-xl flex flex-col flex-col-reverse overflow-hidden">
      <div className="w-full p-8">
        <h1 className="font-semibold text-2xl mb-5">Add Student</h1>
        <p className="text-base">
          Add new students to the system
          by entering their details, ensuring they're included in the student
          database for management and tracking.
        </p>
      </div>
      <img
        src={addStudentImg}
        alt="Student Registration Illustration"
        className="w-full h-60 object-cover rounded-3xl"
      />
      </div>
      </Link>
      <Link
      to="/stulist"
      data-testId = "checkList"
       className="md:w-1/2 max-w-xl mx-auto">
      <div className="rounded-3xl shadow-xl flex flex-col flex-col-reverse overflow-hidden">
      <div className="w-full p-8">
        <h1 className="font-semibold text-2xl mb-5">Check Student List</h1>
        <p className="text-base">
          Instantly access and review all registered students in one place.
           Stay organized, track progress, and manage records effortlessly.
        </p>
      </div>
      <img
        src={studentListImg}
        alt="Student Registration Illustration"
        className="w-full h-60 object-cover rounded-3xl"
      />
      </div>
    </Link>
</div>
</div>
    </>
  )
}

export default Dashboard