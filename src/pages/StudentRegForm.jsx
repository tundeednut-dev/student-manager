import Navbar from "../components/Navbar"
import Select from "react-select"
import { getNames } from "country-list"
import {useState} from "react"
import { useCreateStudent } from "../StudentContext"


const countryName = getNames().map((name) => ({
     label: name,
     value: name,
     name:"country"
}
))


function StudentRegForm() {
const [studentInfo, setStudentInfo] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    age: "",
    country: "",
    email: "",
    phone: "",
    course: ""
})

const {storeStudent, studentList} = useCreateStudent()

const [successMessage, setMessage] = useState(false)


const handleValue = (e) => {
const {name, value} = e.target;
setStudentInfo((prev) => ({...prev, [name]: value}))
}





const [error, setError] = useState({})



const handleSubmit=  (e) => {
    
    e.preventDefault()
    
    let localErrors = {}
    let hasError = false


   Object.entries(studentInfo).forEach(([key, value]) => {
    
     if(!value.trim()){
    localErrors[key] = `${key} is required`
    hasError = true
   }

   else{
   localErrors[key] = ""
   }
})

setError(localErrors)

if(!hasError) {
    setMessage(true)
    setTimeout(() => {
        setMessage(false)
    }, 3000)
    storeStudent(studentInfo)
}


console.log(studentList)


}

    return(
        <>
        <div className="bg-gray-300 w-screen h-screen">
             <Navbar/>
             {successMessage && <p className="text-green-500 text-center">Student Added</p>}
        <div className="bg-white max-w-4xl mt-20 mx-auto rounded-lg px-10 py-10">
        <h1 className="font-bold text-2xl mb-5">Student Profile</h1>
        <div className="border border-4 rounded-lg px-5 py-5">
        <form
        onSubmit={handleSubmit}
         className="flex flex-col space-y-8">
        <div className="container space-x-4">
            <div className="w-1/2 ">
            <label>First Name</label>
        <input
        type="text"
        name="firstName"
        value={studentInfo.firstName}
        onChange={handleValue}
         className="w-full px-2 py-3 rounded-lg bg-gray-200 outline-yellow-200"/>
      <p className="text-red-400">{error.firstName}</p>
        </div>
        <div className="w-1/2 ">
            <label>Last Name</label>
        <input
        type="text"
        name="lastName"
        value={studentInfo.lastName}
        onChange={(e) => handleValue(e, studentInfo.lastName)}
         className="w-full px-2 py-3 rounded-lg bg-gray-200 outline-yellow-200"/>
         <p className="text-red-400">{error.lastName}</p>
        </div>
        </div>
        <div className="container space-x-8">
        <div className="w-1/2">
        <label>Date of Birth</label>
        <input 
        type="date"
        name="dob"
        value={studentInfo.dob}
         onChange={(e) => handleValue(e, studentInfo.dob)}
        className="w-full px-5 bg-gray-200 py-3 rounded-lg font-semibold outline-yellow-200"/>
         <p className="text-red-400">{error.dob}</p>
        </div>
        <div className="w-1/2">
        <label>Gender</label>
        <select
        name="gender"
        value={studentInfo.gender}
         onChange={(e) => handleValue(e, studentInfo.gender)} 
        className=" w-full md:w-2/3 px-5 bg-gray-200 py-3 rounded-lg font-semibold outline-yellow-200">
            <option className="font-bold rounded">Male</option>
            <option className="font-bold rounded">Female</option>
        </select>
         <p className="text-red-400">{error.gender}</p>
        </div>
        </div>
        <div className="container space-x-12">
        <div className="w-1/2">
        <label>Age</label>
        <input
        type="number"
        name="age"
        value={studentInfo.age}onChange={handleValue}
        className="w-full md:w-2/3 bg-gray-200 py-3 px-5 rounded-lg font-semibold outline-yellow-200"
        />
         <p className="text-red-400">{error.age}</p>
        </div>
        <div className="w-1/2">
        <label>Select Country</label>
        <Select
        name="country"
        options={countryName}
        value={countryName.find(country => country.value === studentInfo.country)}
        onChange={(country) => {
            setStudentInfo((prev) => ({...prev, country: country.value}))
        }}
        />
         <p className="text-red-400">{error.country}</p>
        </div>
        </div>
         <div className="w-full md:w-2/3 mx-auto">
        <label>Email</label>
        <input
        name="email"
        type="email"
        value={studentInfo.email}
        onChange={handleValue}
        className="w-full rounded-lg px-5 py-3 bg-gray-200 outline-yellow-200"
        />
         <p className="text-red-400">{error.email}</p>
        </div>
        <div className="container space-x-12">
        <div className="w-1/2">
        <label>Phone Number</label>
        <input
        name="phone"
        onChange={handleValue}
        value={studentInfo.phone}
        type="text"
         className="w-full rounded-lg px-5 py-3 bg-gray-200 outline-yellow-200"
        />
         <p className="text-red-400">{error.phone}</p>
        </div>
         <div className="w-1/2">
        <label>Course</label>
        <input
        name="course"
        onChange={handleValue}
        value={studentInfo.course}
        type="text"
         className="w-full rounded-lg px-5 py-3 bg-gray-200 outline-yellow-200"
        />
         <p className="text-red-400">{error.course}</p>
        </div>
        </div>
        <button 
        type="submit"
        className="bg-gray-500 w-1/3 text-xl font-bold mx-auto py-3 rounded-xl"
        >
            Submit
        </button>
        </form>
        </div>
        </div>
        </div>
        </>
    )
}

export default StudentRegForm