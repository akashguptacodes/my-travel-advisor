// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// function Hero() {
//   const navigate = useNavigate();

//   const GetStartedHandler = () => {
//       navigate('/create-trip')
//   }

//   return (
//     <div className='flex flex-col h-[88vh] mb-0 gap-40 justify-between sm:px-10 md:px-32 lg:px-56 xl:px-70 px-5'>
//       <div className='flex flex-col items-center gap-9'>
//         <h1 className='font-extrabold text-5xl text-center mt-16'>
//             <span className='text-[#f56551]'>Your Trusted Guide to Safe and Memorable Travels:</span><span className='text-[#444554]'>Explore the World Confidently, with Expert Advice</span> 
//         </h1>
//         <p className='text-xl text-gray-700 text-center'>
//             "Our expert insights and real-time safety updates ensure your travels are as safe as they are unforgettable."
//         </p>
//         <button onClick={GetStartedHandler} className='font-semibold mt-14 px-8 py-2 bg-green-600 hover:text-gray-200 border-none hover:bg-gray-700 transition duration-300 ease-in-out'>Get Started, it's free</button>
//       </div>
//     </div>
//   )
// }

// export default Hero;


// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import homeVideo from '../../assets/homeVideo.mp4'

// function Hero() {
//   const navigate = useNavigate();

//   const GetStartedHandler = () => {
//       navigate('/create-trip')
//   }

//   return (
//     <div className='flex flex-col h-[88vh] mb-0 gap-40 justify-between sm:px-10 md:px-32 lg:px-56 xl:px-70 px-5'>
//       <div className='flex flex-col items-center gap-9'>
//         <div className='flex justify-between items-center gap-10 mt-16'>
//           <div>
//             <h1 className='font-extrabold text-4xl'>
//               <span className='text-[#f56551]'>Your Trusted Guide to Safe and Memorable Travels:</span><span className='text-[#444554]'>Explore the World Confidently, with Expert Advice</span> 
//             </h1>
//             <p className='text-xl text-gray-700'>
//                 "Our expert insights and real-time safety updates ensure your travels are as safe as they are unforgettable."
//             </p>
//           </div>
//           <div className=''>
//           <video className='rounded-lg' autoPlay muted loop>
//               <source src={homeVideo} type='video/mp4'></source>
//           </video>
//           </div>
//         </div>
//         <button onClick={GetStartedHandler} className='font-semibold mt-14 px-8 py-2 bg-green-600 hover:text-gray-200 border-none hover:bg-gray-700 transition duration-300 ease-in-out'>Get Started, it's free</button>
//       </div>
//     </div>
//   )
// }

// export default Hero;





import React from 'react'
import { useNavigate } from 'react-router-dom'
import homeVideo from '../../assets/homeVideo.mp4'
import { fadeIn } from '../../../framer';
import { motion } from 'framer-motion';

function Hero() {
  const navigate = useNavigate();

  const GetStartedHandler = () => {
      navigate('/create-trip')
  }

  return (
<div className="flex flex-col lg:flex-row items-center h-[88vh] gap-10 px-5 sm:px-10 md:px-32 lg:px-56 xl:px-70 bg-gradient-to-r from-gray-50 to-gray-200">
  <motion.div
    variants={fadeIn('up',0.2)}
    initial="hidden"
    animate="show"
    className="flex flex-col gap-6 sm:w-1/2">
    <h1 className="font-extrabold text-4xl leading-snug text-center sm:text-left">
      <span className="text-[#f56551] block">Your Trusted Guide to Safe and Memorable Travels:</span>
      <span className="text-[#444554] block">Explore the World Confidently, with Expert Advice</span>
    </h1>
    <p className="text-lg sm:text-xl text-gray-700 text-center sm:text-left">
      "Our expert insights and real-time safety updates ensure your travels are as safe as they are unforgettable."
    </p>
    <button
      onClick={GetStartedHandler}
      className="font-semibold self-center sm:self-start mt-6 px-8 py-2 bg-green-600 text-white hover:text-gray-200 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out"
    >
      Get Started, it's free
    </button>
  </motion.div>

  <motion.div
    variants={fadeIn('down',0.2)}
    initial="hidden"
    animate="show"
    className="sm:w-1/2">
    <video className="rounded-lg shadow-lg w-full h-auto max-w-[500px] mx-auto" autoPlay muted loop>
      <source src={homeVideo} type="video/mp4" />
    </video>
  </motion.div>
</div>
  )
}

export default Hero;