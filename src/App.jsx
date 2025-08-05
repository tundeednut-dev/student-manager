import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HeroSection from './pages/HeroSection';
import Login from "./pages/LoginPage";
import Dashboard from './pages/Dashboard';
import StudentRegForm from './pages/StudentRegForm';
import StudentList from './pages/StudentList';
import EditPage from './pages/EditPage';
import { StudentProvider } from './StudentContext';



function App() {
  return (
  <StudentProvider>
    <Router>
      <Routes>
        <Route path='/' element = {<HeroSection/>}/>
     <Route path='/authpage' element = {<Login/>}/>
     <Route path='/dashboard' element = {<Dashboard/>}/>
     <Route path='/regForm' element = {<StudentRegForm/>}/>
     <Route path='/stulist' element = {<StudentList/>}/>
     <Route path='/edit' element = {<EditPage/>}/>
      </Routes>
      </Router>
</StudentProvider>
  );
}

export default App;
