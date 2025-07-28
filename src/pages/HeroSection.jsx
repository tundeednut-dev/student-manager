import Banner from "../assets/Frame 2.png"
import Logo from "../assets/logo (1).png";
import {Link} from "react-router-dom";


function HeroSection(){
    return(
        <>
            <div className="block md:w-screen md:flex h-screen overflow-x-hidden">
                <div className="w-full h-1/2 mt-10 md:flex md:w-1/2 md:h-screen items-center">
                <div className="w-full h-full md:h-1/2 w-full px-10 ">
                <img src={Logo} className=" w-[300px] md:w-[400px] mb-20"/>
                <div>
                <span className="block text-4xl md:text-6xl font-semibold text-blue-800">Empowering Schools, One Student at a Time</span>
                </div>
                <div className="flex justify-center mt-20 ">
                     <Link to="/authpage">
                    <button className=" text-2xl font-bold px-20 py-5 rounded-xl bg-[#566082]">
                   Get Started
                    </button>
                    </Link>
                    </div>
                    </div>
            
                </div>
                
        <div className="w-full h-1/2 md:w-1/2 md:h-screen">
      <img src={Banner} className="h-full w-full object-cover"/>
        </div>
        </div>
        </>
    )
}

export default HeroSection