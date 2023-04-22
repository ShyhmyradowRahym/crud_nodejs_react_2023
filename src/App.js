import { Routes, Route, useLocation, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import PrivateRoute from './auth/PrivateRoute';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import TopBarProgress from "react-topbar-progress-indicator";
import Admins from './pages/Admins';
import NotFound from './pages/NotFound';
TopBarProgress.config({
  barColors: {
    "0": "#4F46E5",
    "1.0": "#4F46E5"
  },
  barThickness: 4,
  shadowBlur: 5
});
function App() {
  const [toggleMenu, setToggleMenu] = useState(true)
  const [progress, setProgress] = useState(false)
  const [prevLoc, setPrevLoc] = useState("")
  const location = useLocation();
  useEffect(() => {
    setPrevLoc(location.pathname)
    setProgress(true)
    if (location.pathname === prevLoc) {
      setPrevLoc('')
    }
  }, [location])
  useEffect(() => {
    if (progress === true) {
      setProgress(false);
    }
  }, [prevLoc, progress])
  return (
    <div>
      {/* <ScrollTop /> */}
      {progress && <TopBarProgress />}
      <div className='flex justify-between'>
        <NavBar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu}>
        <div className='w-full bg-gray-50'>
          <Routes>
            {/* <Route element={<PrivateRoute />}> */}
              <Route element={<Dashboard />} path='/dashboard' />
              <Route element={<Dashboard />} path='/' />
              <Route element={<Admins />} path='/admins' />
            {/* </Route> */}
            <Route element={<NotFound />} path='/*' />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
        </NavBar>
      </div>
    </div>
  );
}

export default App;
