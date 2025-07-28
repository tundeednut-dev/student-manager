import Logo from "../assets/logo (1).png"
import {Link} from "react-router-dom"

function SideBar () {

    return(
        <>
        <div className={`fixed left-0 top-0 h-screen bg-gray-100 rounded-xl transition-all duration-300 ease-in-out w-1/6 hidden lg:block`}>
                    <div className="w-full h-20 flex items-center">
      <img 
      data-testid = "desktop-logo"
      src={Logo} 
      alt="siteLogo" 
      className=" w-5/6"/>
      
    </div>
      
      <div>
        
        <div className="mt-20 mx-7"> 
          <div className="text-gray-400 font-semibold text-sm">OVERVIEW</div>
          <div className="mt-5 text-lg font-semibold"><Link to='/dashboard'>Dashboard</Link></div>
           <div className="mt-5 text-lg font-semibold"><Link to="/regform">Add Student</Link></div>
           <div className="mt-5 text-lg font-semibold"><Link to="/stulist">Check Student Lis</Link>t</div>
        </div>
      </div>

        </div>
        </>
    )
}

export default SideBar

