import React, { useState } from 'react'
import newLogo2 from '../../assets/newLogo2.jpg'
import { NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { HiOutlineLogout } from "react-icons/hi";
import { googleLogout } from '@react-oauth/google';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


function Header({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate()
  const [nav, setNav] = useState(true)

  const MytripsHandler = () => {
    if (loggedIn) {
      toast('Fetching your trips', {
        icon: '🔮',
        style: {
          border: 'none',
          padding: '10px',
          color: '#524e50',
          background: '#ffffff',
        }
      })
      navigate('/mytrips')
    }
    else {
      toast('Make sure that you are logged in', {
        icon: '⚠️',
        style: {
          border: '1px solid #ffa726',
          padding: '16px',
          color: '#ff9800',
          background: '#FFF4E5',
        }
      })
    }
  }

  const navHandler = () => {
    setNav(!nav);
  }

  const logout = () => {
    googleLogout();
    setLoggedIn(false);
    localStorage.clear()
    toast.success('Logged out, visit us whenever you need')
  }



  return (
    <div className='shadow-sm flex flex-col justify-between sm:flex-row items-center px-10 py-3'>
      <div>
        <NavLink to='/'>
          <img src={newLogo2} className='h-24'></img>
        </NavLink>
      </div>



      <div className='h-0 opacity-0 overflow-hidden sm:h-auto sm:opacity-100 sm:flex gap-3 py-1 px-2'>
        <div>
          <NavLink to='/about'>
            <button className='rounded-none shadow-md bg-transparent border-none bg-blue-100 py-[0.4rem] px-7 text-sm text-gray-900 hover:scale-110 hover:shadow-xl transition-all duration-200'>🔍<br />About</button>
          </NavLink>
        </div>
        <div>
          <NavLink to='/'>
            <button className='rounded-none shadow-md bg-transparent border-none bg-blue-100 py-[0.4rem] px-7 text-sm text-gray-900 hover:scale-110 hover:shadow-xl transition-all duration-200'>🛖<br />Home</button>
          </NavLink>
        </div>
        <div>
          <NavLink to='/create-trip'>
            <button className='rounded-none shadow-md bg-transparent border-none bg-blue-100 py-[0.4rem] text-sm px-3 text-gray-900 hover:scale-110 hover:shadow-xl transition-all duration-200'>📝<br />Create Trip</button>
          </NavLink>
        </div>
        <div>
          <button onClick={MytripsHandler} className='rounded-none shadow-md bg-transparent border-none bg-blue-100 py-[0.4rem] font-semibold text-sm px-3 text-gray-900 hover:scale-110 hover:shadow-xl transition-all duration-200'>🛫<br />My trips</button>
        </div>





        {
          loggedIn ? (
            <div className='pl-4 ml-4 border-l-2 pt-2'>
              <Popover>
                <PopoverTrigger>
                  <img src={`${localStorage.getItem('profilepic')}`} className='h-10 rounded-full' alt='profile' loading='lazy'></img>
                </PopoverTrigger>
                <PopoverContent className='rounded-3xl'>
                  <div>
                    <img src={`${localStorage.getItem('profilepic')}`} alt='profile' loading='lazy' className='h-14 rounded-full ml-[40%] mt-4'></img>
                    <h2 className='font-semibold text-lg text-gray-800 mt-3 text-center'>{`Welcome ${localStorage.getItem('given_name')} !`}</h2>
                    <button onClick={logout} className='flex gap-2 mt-3 px-1 py-1'><HiOutlineLogout fontSize='1.5rem' />Log out</button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : ('')
        }
      </div>
      <div className='bg-gray-100 z-30 flex justify-between w-full fixed bottom-0 px-6 sm:opacity-0 sm:hidden sm:overflow-hidden'>
        <div>
          <NavLink to='/about'>
            <button className='p-1 text-lg'>🔍</button>
          </NavLink>
        </div>
        <div>
          <NavLink to='/'>
            <button className='p-1 text-lg'>🛖</button>
          </NavLink>
        </div>
        <div>
          <NavLink to='/create-trip'>
            <button className='p-1 text-lg'>📝</button>
          </NavLink>
        </div>
        <div>
          <button onClick={MytripsHandler} className='p-1 text-lg'>🛫</button>
        </div>
        <div className='pt-1'>
          <Popover>
            <PopoverTrigger>
              <img src={`${localStorage.getItem('profilepic')}`} className='h-8 rounded-full' alt='profile' loading='lazy'></img>
            </PopoverTrigger>
            <PopoverContent className='rounded-3xl'>
              <div>
                <img src={`${localStorage.getItem('profilepic')}`} alt='profile' loading='lazy' className='h-14 rounded-full ml-[40%] mt-4'></img>
                <h2 className='font-semibold text-lg text-gray-800 mt-3 text-center'>{`Welcome ${localStorage.getItem('given_name')} !`}</h2>
                <button onClick={logout} className='flex gap-2 mt-3 px-1 py-1'><HiOutlineLogout fontSize='1.5rem' />Log out</button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default Header
