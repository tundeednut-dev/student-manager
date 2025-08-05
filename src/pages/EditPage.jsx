import { useStudentContext } from "../StudentContext";
import Navbar from "../components/Navbar";
import Select from "react-select"
import { getNames } from "country-list"
import { useState } from "react";

const countryName = getNames().map((name) => ({
    label: name,
    value: name,
    name:"country"
}))

function EditPage() {
    const {edStudent, setEdStudent, studentList, setStudentList} = useStudentContext()
    const [err, setErr] = useState({})
    const [editMessage, setEditMessage] = useState(false)
    
if (studentList.length === 0) return; 
    
const handleValue = (e) => {
        const {name, value} = e.target;
        setEdStudent((prev) => ({
            ...prev, [name]: value
        }))
    }

    


    const handleSubmit2 = (e) => {
        e.preventDefault()

         let errorEdit = {}
        let hasError = false

        Object.entries(edStudent).forEach(([key, value]) => {

            if(!String(value).trim()){
                hasError = true;
                errorEdit[key] = `${key} is required`
            }

            else{
                errorEdit[key] = ""
            }
        })

        setErr(errorEdit)

        if(hasError === false){
           setEditMessage(true)
           setTimeout(() => (
            setEditMessage(false)
           ), 3000)
        }
      
        setStudentList((prev) => {
         const updatedList2 = prev.map((student) => (
            student.id === edStudent.id ? edStudent : student
         ))
    localStorage.setItem("student", JSON.stringify(updatedList2))
    return updatedList2
    })
    }

    return(
        <>
        <div className="bg-gray-300 w-screen h-screen">
        <Navbar/>
            {edStudent && (
                <>
                {editMessage && (<p className="text-green-500 text-center">Student Edited</p>)}
                <div className="bg-white max-w-4xl mt-20 mx-auto rounded-lg px-10 py-10">
                     <h1 className="font-bold text-2xl mb-5">Student Profile (Edit)</h1>
                 <div className="border border-4 rounded-lg px-5 py-5">
                    <form 
                    onSubmit={handleSubmit2}
                    className="flex flex-col space-y-8">
                <div className="container space-x-4">
                            <div className="w-1/2 ">
                            <label htmlFor="firstName">First Name</label>
                        <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={edStudent?.firstName || ""}
                        onChange={handleValue}
                         className="w-full px-2 py-3 rounded-lg bg-gray-200 outline-yellow-200"/>
                         <p>{err.firstName}</p>
                        </div>
                        <div className="w-1/2 ">
                            <label htmlFor="lastName">Last Name</label>
                        <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={edStudent?.lastName || ""}
                        onChange={handleValue}
                         className="w-full px-2 py-3 rounded-lg bg-gray-200 outline-yellow-200"/>
                          <p>{err.lastName}</p>
                        </div>
                        </div>
                        <div className="container space-x-8">
                        <div className="w-1/2">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                        id="dob"
                        type="date"
                        name="dob"
                        value={edStudent?.dob || ""}
                        onChange={handleValue}
                        className="w-full px-5 bg-gray-200 py-3 rounded-lg font-semibold outline-yellow-200"/>
                          <p>{err.dob}</p>
                        </div>
                        <div className="w-1/2">
                        <label htmlFor="gender">Gender</label>
                        <select
                        id="gender"
                        name="gender"
                        value={edStudent?.gender || ""}
                        onChange={handleValue}
                        className=" w-full md:w-2/3 px-5 bg-gray-200 py-3 rounded-lg font-semibold outline-yellow-200">
                             <option value={""} className="font-bold rounded">Select Gender</option>
                            <option className="font-bold rounded">Male</option>
                            <option className="font-bold rounded">Female</option>
                        </select>
                          <p>{err.gender}</p>
                        </div>
                        </div>
                        <div className="container space-x-12">
                        <div className="w-1/2">
                        <label htmlFor="age">Age</label>
                        <input
                        id="age"
                        type="number"
                        name="age"
                        value={edStudent?.age || ""}
                        onChange={handleValue}
                        className="w-full md:w-2/3 bg-gray-200 py-3 px-5 rounded-lg font-semibold outline-yellow-200"
                        />
                          <p>{err.age}</p>
                        </div>
                        <div className="w-1/2">
                        <label id="nation" htmlFor="country-label">Select Country</label>
                        <Select
                        inputId="country-label"
                        aria-labelledby="nation"
                        name="country"
                        options={countryName}
                        value={countryName.find(country => country.value === edStudent.country)}
                       onChange={(country) => (
                        setEdStudent((prev) => ({
                            ...prev, country: country.value
                        }))
                       )}
                        />
                          <p>{err.country}</p>
                        </div>
                        </div>
                         <div className="w-full md:w-2/3 mx-auto">
                        <label htmlFor="email">Email</label>
                        <input
                        id="email"
                        name="email"
                        type="email"
                        value={edStudent?.email || ""}
                        onChange={handleValue}
                        className="w-full rounded-lg px-5 py-3 bg-gray-200 outline-yellow-200"
                        />
                          <p>{err.email}</p>
                        </div>
                        <div className="container space-x-12">
                        <div className="w-1/2">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                        id="phone"
                        name="phone"
                        value={edStudent?.phone || ""}
                        onChange={handleValue}
                        type="text"
                         className="w-full rounded-lg px-5 py-3 bg-gray-200 outline-yellow-200"
                        />
                          <p>{err.phone}</p>
                        </div>
                         <div className="w-1/2">
                        <label htmlFor="course">Course</label>
                        <input
                        id="course" 
                        name="course"
                        value={edStudent?.course || ""}
                        onChange={handleValue}
                        type="text"
                         className="w-full rounded-lg px-5 py-3 bg-gray-200 outline-yellow-200"
                        />
                          <p>{err.course}</p>
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
                </>
            )}
        </div>
        </>
    )
}

export default EditPage