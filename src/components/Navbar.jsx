import { useState, useEffect } from "react"
import UserIcon from "../assets/userAvata.png"
import Logo from "../assets/logo (1).png";
import { Link } from "react-router-dom";
import SideBar from "./SideBar"

function Navbar(){

    const [user, setUser] = useState({})
    const [sideBar, openSideBar] = useState(false)


    useEffect(() => {
        const storedUser = localStorage.getItem("userInfo")
        if(storedUser) {
            setUser(JSON.parse(storedUser))
        }
        
    }, [])


 return(
       <>
  <div className="w-full">
    
    <div className="bg-white flex items-center w-full h-20 shadow  text-white">
      <div>
        <button onClick={() => openSideBar(true)}
                aria-label="hamburger"
                >
      <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="size-6 mx-7 lg:hidden">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
</button>
</div>
<div className="w-5/6">
  <p className="text-black font-bold text-2xl md">Welcome  {user.userName}</p>
</div>
        <img src={UserIcon} alt="User" className="lg:w-10 h-10 rounded-full mx-7" />
        <span className="lg:font-bold lg:mx-4 lg:block lg:text-black hidden">{user.userName}</span>
        
      </div>
    
   {sideBar === true && ( <div className="fixed top-0 left-0 z-50 h-screen w-1/2 md:w-1/3 bg-gray-100 rounded-xl transition-all duration-300 ease-in-out lg:hidden">
    <div className="w-full h-20 flex items-center">
      <img 
      data-testid = "mobile-logo"
      src={Logo} alt="siteLogo" 
      className=" w-5/6"/>
      <button onClick={() => openSideBar(false)}
                aria-label="cancel"
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 mx-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

      </button>
    </div>
      
      <div>
        <div className="mt-20 mx-7"> 
          <div className="text-gray-400 font-semibold text-sm">OVERVIEW</div>
          <div className="mt-5 text-lg font-semibold"><Link to='/dashboard'>Dashboard</Link></div>
           <div className="mt-5 text-lg font-semibold"><Link to='/regForm'>Add Student</Link></div>
           <div className="mt-5 text-lg font-semibold"> <Link to="/stulist">Check Student List</Link></div>
        </div>
      </div>
    </div>
    )}
    <SideBar isOpen={sideBar}/>
  </div>
</>
 )
}

export default Navbar

