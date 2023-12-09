import { useContext, useState } from 'react'
import './App.css'
import AuthComponent from './Components/AuthComponent/AuthComponent'
import AuthState from './Context/Auth/AuthState'
import AuthContext from './Context/Auth/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from './Components/Profile/Profile'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import AllDoctors from './Components/AllDoctors/AllDoctors'
import DoctorAvailability from './Components/DoctorAvailability/DoctorAvailability'
import LoadingBar from 'react-top-loading-bar'

function App() {
  const { Loggedin, isDoc, progress, setProgress } = useContext(AuthContext)

  return (
    <>
      {(!Loggedin) && (<AuthComponent />)}
      <LoadingBar
        color='#daa520'
        progress={progress}
        height={5}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar />
      <Routes>
        <Route path='/profile' element={<Profile />} />
        <Route path='/' element={<Home />} />
        {(!isDoc) && (<Route path='/doctors' element={<AllDoctors />} />)}
        {(isDoc) && (<Route path='/availability' element={<DoctorAvailability />} />)}
      </Routes>
    </>
  )
}

const AppWithExtras = () => {
  return (
    <BrowserRouter>
      <AuthState>
        <App />
      </AuthState>
    </BrowserRouter>
  )
}
export default AppWithExtras
