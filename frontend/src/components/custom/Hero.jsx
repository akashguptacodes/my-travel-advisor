import React from 'react'
import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate();

  const GetStartedHandler = () => {
      navigate('/create-trip')
  }

  return (
    <div className='flex flex-col h-[88vh] mb-0 gap-40 justify-between sm:px-10 md:px-32 lg:px-56 xl:px-70 px-5'>
      <div className='flex flex-col items-center gap-9'>
        <h1 className='font-extrabold text-5xl text-center mt-16'>
            <span className='text-[#f56551]'>Your Trusted Guide to Safe and Memorable Travels:</span><span className='text-[#444554]'>Explore the World Confidently, with Expert Advice</span> 
        </h1>
        <p className='text-xl text-gray-700 text-center'>
            "Our expert insights and real-time safety updates ensure your travels are as safe as they are unforgettable."
        </p>
        <button onClick={GetStartedHandler} className='font-semibold mt-14 px-8 py-2 bg-green-600 hover:text-gray-200 border-none hover:bg-gray-700 transition duration-300 ease-in-out'>Get Started, it's free</button>
      </div>
    </div>
  )
}

export default Hero;
