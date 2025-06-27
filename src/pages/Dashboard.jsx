import { useState, useEffect } from "react"

function Dashboard(){

    const [user, setUser] = useState({})

    useEffect(() => {
        const storedUser = localStorage.getItem("studentInfo")
        if(storedUser) {
            setUser(JSON.parse(storedUser))
        }
        
    }, [])

    console.log(user.userName)
 
    return(
        <>
        <div className="w-full">
            <div className="flex items-center w-full h-20 shadow">
                    <div className="h-1/2 font-bold text-2xl mx-3 w-1/2">Welcome {user.userName}</div>
                </div>
            </div>
       
        </>
    )
}

export default Dashboard