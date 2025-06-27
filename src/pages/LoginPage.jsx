import { useState } from "react";
import { useNavigate } from "react-router-dom";


import UserIcon from "../assets/User.png";
import EyeIcon from "../assets/Eye.png";
import KeyIcon from "../assets/Key.png";
import Logo from "../assets/logo (1).png";
import Banner from "../assets/projectImg1.jpg";
import CheckCircle from "../assets/CheckCircle.png";
import Vector from "../assets/Vector.png";

function Login() {
  const [studentProfile, setStudentProfile] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState({
    fullName: "",
    userName: "",
    password: "",
     email: ""
  });

  const [passwordDisplay, setPasswordDisplay] = useState(false)

  const navigate = useNavigate()

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, userName, email, password } = studentProfile;

    const newError = {}

    if (!fullName.trim()) newError.fullName = "Fullname is required.";
    if (!userName.trim()) newError.userName = "Username is required."
    if (!email.trim()) newError.email = "Email is required."
    if (!password) newError.password = "Password is required."


    const hasUppercase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 8;
    const isValid = /^[\w.-]+@gmail\.com$/.test(email)

    if (password && (!hasUppercase || !hasLowerCase || !isLongEnough)) {
      newError.password = "Password must have at least 8 characters, one uppercase letter, and one lowercase letter."
    }
   if(email && !isValid){
      newError.email = "Invalid Email"
    }

    if (Object.keys(newError).length > 0) {
  setError(newError);
  return;
}

    localStorage.setItem("studentInfo", JSON.stringify(studentProfile));
    setError("");

    navigate('/dashboard')
    

  };

  const checkCase = (str) => /[A-Z]/.test(str);
  const checkCase2 = (str) => /[a-z]/.test(str);

  return (
    <div className="relative w-screen min-h-screen  md:flex overflow-x-hidden bg-[#F8F7FD]">
      <div className="w-full h-[300px] md:h-screen md:flex md:w-1/2">
        <img
          src={Banner}
          alt="Banner"
          className="w-full h-full md:w-full object-cover"
        />
      </div>

      <div className="absolute top-[250px] left-1/2 transform -translate-x-1/2 w-[80%] bg-white rounded-xl p-5 
               md:flex md:justify-center md:static md:top-auto md:left-auto md:transform-none md:w-1/2">
        <div className="w-full max-w-md space-y-5">
          <div className="space-y-3">
            <img src={Logo} alt="Logo" />
            <h1 className="font-bold text-2xl">Create an account</h1>
            <p className="text-sm text-gray-600">
              Welcome to GradWise, your gateway to professionalism
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullname" className="text-sm font-semibold">Full Name</label>
              <div className="flex items-center border border-black rounded-md h-12 px-2">
                <img src={UserIcon} alt="User Icon" />
                <input
                id="fullname"
                  type="text"
                  value={studentProfile.fullName}
                  onChange={(e) =>
                    setStudentProfile({
                      ...studentProfile,
                      fullName: e.target.value,
                    })
                  }
                  className="outline-none w-full px-2 text-sm"
                />
              </div>
            </div>
            {error.fullName && <p  className="text-red-500">{error.fullName}</p>}

            <div>
              <label htmlFor="username" className="text-sm font-semibold">Username</label>
              <div className="flex items-center border border-black rounded-md h-12 px-2">
                <img src={UserIcon} alt="User Icon" />
                <input
                id="username"
                  type="text"
                  value={studentProfile.userName}
                  onChange={(e) =>
                    setStudentProfile({
                      ...studentProfile,
                      userName: e.target.value,
                    })
                  }
                  className="outline-none w-full px-2 text-sm"
                />
              </div>
            </div>
             {error.userName && <p  className="text-red-500">{error.userName}</p>}


             <div>
              <label htmlFor="email" className="text-sm font-semibold">Email</label>
              <div className="flex items-center border border-black rounded-md h-12 px-2">
                <img src={UserIcon} alt="User Icon" />
                <input
                id="email"
                  type="text"
                  value={studentProfile.email}
                  onChange={(e) =>
                    setStudentProfile({
                      ...studentProfile,
                      email: e.target.value,
                    })
                  }
                  className="outline-none w-full px-2 text-sm"
                />
              </div>
            </div>
                   {error.email && <p className="text-red-500">{error.email}</p>}

            <div>
              <label htmlFor="password" className="text-sm font-semibold">Password</label>
              <div className="flex items-center border border-black rounded-md h-12 px-2">
                <img src={KeyIcon} alt="Key Icon" />
                <input
                id="password"
                  type= {`${passwordDisplay ? 'text' : 'password'}`}
                  value={studentProfile.password}
                  onChange={(e) =>
                    setStudentProfile({
                      ...studentProfile,
                      password: e.target.value,
                    })
                  }
                  className= 'outline-none w-full px-2 text-sm'
                />

                <button type="button" onClick={() => setPasswordDisplay(!passwordDisplay)}>
                  <img src={EyeIcon} alt="Toggle Password Visibility" className="ml-2" />
                </button>
              </div>
            </div>
             {error.password && <p className="text-red-500">{error.password}</p>}
            <div className="text-xs space-y-1">
              <p className="text-gray-700">A strong password should include:</p>
              <p className="flex items-center">
                <img
                  src={
                    studentProfile.password.length < 8 ? CheckCircle : Vector
                  }
                  className="mr-2"
                />
                8+ characters
              </p>
              <p className="flex items-center">
                <img
                  src={!checkCase(studentProfile.password) ? CheckCircle : Vector}
                  className="mr-2"
                />
                Uppercase letter
              </p>
              <p className="flex items-center">
                <img
                  src={!checkCase2(studentProfile.password) ? CheckCircle : Vector}
                  className="mr-2"
                />
                Lowercase letter
              </p>
            </div>

            <button
              type="submit"
              className="bg-[#566082] w-full h-[48px] rounded-md text-white font-semibold"
            >
              Sign Up
            </button>
          </form>

          <p className="text-xs text-gray-600 text-center">
            By signing up, you agree to our Terms of service and Privacy policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
