import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HeroSection from './pages/HeroSection';
import Login from "./pages/LoginPage";
import Dashboard from './pages/Dashboard';
import StudentRegForm from './pages/StudentRegForm';
import StudentList from './pages/StudentList';
import EditPage from './pages/EditPage';
import { StudentContext } from './StudentContext';



function App() {
  return (
  
    <Router>
      <Routes>
        <Route path='/' element = {<HeroSection/>}/>
     <Route path='/authpage' element = {<Login/>}/>
     <Route path='/dashboard' element = {<StudentContext><Dashboard/></StudentContext>}/>
     <Route path='/regForm' element = {<StudentContext><StudentRegForm/></StudentContext>}/>
     <Route path='/stulist' element = {<StudentContext><StudentList/></StudentContext>}/>
     <Route path='/edit' element = {<StudentContext><EditPage/></StudentContext>}/>
      </Routes>
      </Router>


  );
}

export default App;
