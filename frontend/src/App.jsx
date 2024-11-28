import { useEffect, useState,} from 'react'
import './App.css'
import Hero from './components/custom/Hero'
import { Routes, Route } from 'react-router-dom'
import CreateTrip from './create-trip/CreateTrip'
import Header from './components/custom/Header'
import ViewTrip from './Viewtrip/ViewTrip'
import MyTrips from './Mytrips/MyTrips'
import { GoogleOAuthProvider } from '@react-oauth/google'
import toast from 'react-hot-toast'
import PrivateRoute from './components/custom/PrivateRoute'
import About from './components/custom/About'

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    // Check local storage for loggedIn state
    return localStorage.getItem('loggedIn') === 'true';
  });

  // function HandleLocalStorage(){
  //   {  loggedIn?(
  //     setTimeout(() => {
  //       localStorage.clear()
  //       setLoggedIn(false)
  //       toast.error('Connection time out, login again')
  //     }, 30*60*1000)
  //   ):(
  //     localStorage.clear()
  //   )
  // }
  // }

  // useEffect(()=>{
  //   HandleLocalStorage()
  // }, [])

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          {/* <div className='bg-gradient-to-r from-blue-100 to-blue-400'> */}
            <Routes>
              <Route path='/' element={<Hero loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
              <Route path='/about' element={<About/>} />
              <Route path='/create-trip' element={<CreateTrip loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
              <Route path='/viewtrip/:tripId' element={
                <PrivateRoute loggedIn={loggedIn}>
                  <ViewTrip />
                </PrivateRoute>
              } />
              <Route path='/mytrips' element={
                <PrivateRoute loggedIn={loggedIn}>
                  <MyTrips />
                </PrivateRoute>
              } />
            </Routes>
          {/* </div> */}
    </GoogleOAuthProvider>
  )
}

export default App
