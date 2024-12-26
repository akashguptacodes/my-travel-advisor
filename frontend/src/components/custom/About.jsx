import React from 'react'
import video1 from '../../assets/video1.mp4'
import video2 from '../../assets/video2.mp4'
import video3 from '../../assets/video3.mp4'
import map from '../../assets/map.png'
import map2 from '../../assets/map2.png'
import { motion } from 'framer-motion'
import { fadeIn } from '../../../framer'

const boxVariant = {
    hidden:{
        y: '-100vh',
        opacity:0.3
    },
    visible: {
        y: 0,
        opacity:1,
        transition: {
            when: 'beforeChildren',
            staggerChildren:0.1,
        }
    }
}

const listVariant = {
    hidden:{
        y:-10,
        opacity:0,
    },
    visible:{
        y:0,
        opacity:1
    }
}
const heading = ['D','i','s','c','o','v','e','r',' ','t','h','e',' ','w','o','n','d','e','r','s',' ','o','f',' ','t','h','i','s',' ','w','e','b','s','i','t','e']

function About() {
    return (
        <div className='py-1 sm:px-10 md:px-32 lg:px-56 xl:px-70 px-5'>
            <div className='bg-gray-100 flex flex-col py-10 mb-10 gap-40 justify-between shadow-slate-950 bg-gradient-to-r from-gray-50 to-gray-200 rounded-lg px-10'>
                <motion.h1
                    variants={boxVariant}
                    initial='hidden'
                    animate='visible'
                    className='text-4xl text-center font-bold text-gray-800'
                >
                    {
                        heading.map((letter) => {
                            return (<motion.span key={letter}
                                         variants={listVariant}
                                    >{letter}</motion.span>)
                        })
                    }
                </motion.h1>
                <div className='flex flex-col gap-5 justify-center items-center sm:flex sm:flex-row'>
                    <motion.div
                        variants={fadeIn('right',0)}
                        initial="hidden"
                        whileInView='show'
                        className='w-full flex justify-center hover:scale-105 transition duration-300'>
                        <video className='h-[100%] w-[100%] rounded-lg border-4 border-gray-800' autoPlay muted loop>
                            <source src={video1} type='video/mp4'></source>
                        </video>
                    </motion.div>
                    <motion.div
                        variants={fadeIn('left',0)}
                        initial="hidden"
                        whileInView='show'
                        className='w-full'>
                        <h1 className='text-3xl text-gray-800 font-semibold'>Plan your trip and get hotel and tourist attractions details at your fingertips</h1>
                        <p className='mt-3 text-lg text-gray-600'>
                            Plan your trip with ease!
                        </p>
                    </motion.div>
                </div>
                <div className='flex flex-col-reverse gap-5 justify-center items-center sm:flex sm:flex-row mt-10'>
                    <motion.div
                        variants={fadeIn('right',0)}
                        initial="hidden"
                        whileInView='show'
                        className='w-full'>
                        <h1 className='text-3xl text-gray-800 font-semibold'>Wishing you a safe journey filled with beautiful moments and unforgettable memories!</h1>
                        <p className='mt-3 text-lg text-gray-600'>
                            Your safety is our first priority.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={fadeIn('left',0)}
                        initial="hidden"
                        whileInView='show'
                        className='w-full flex justify-center hover:scale-105 transition duration-300'>
                        <video className='h-[100%] w-[100%] rounded-lg border-4 border-gray-800' autoPlay muted loop>
                            <source src={video2} type='video/mp4'></source>
                        </video>
                    </motion.div>
                </div>
                <div className='flex flex-col gap-5 justify-center items-center sm:flex sm:flex-row mt-10'>
                    <motion.div
                        variants={fadeIn('right',0)}
                        initial="hidden"
                        whileInView='show'
                        className='w-full flex justify-center hover:scale-105 transition duration-300'>
                        <video className='h-[100%] w-[100%] rounded-lg border-4 border-gray-800' autoPlay muted loop>
                            <source src={video3} type='video/mp4'></source>
                        </video>
                    </motion.div>
                    <motion.div
                        variants={fadeIn('left',0)}
                        initial="hidden"
                        whileInView='show'
                        className='w-full'>
                        <h1 className='text-3xl text-gray-800 font-semibold'>Get started and dive into days full of joy, adventure, and endless possibilities!</h1>
                        <p className='mt-3 text-lg text-gray-600'>
                            Have a happy journey.
                        </p>
                    </motion.div>
                </div>

                {/* Map Section 1 */}
                <div className='flex flex-col md:flex-row gap-8 md:items-center transition-transform duration-300'>
                    <motion.div
                        variants={fadeIn('right',0)}
                        initial="hidden"
                        whileInView='show'
                        className='md:w-1/2 text-center md:text-left'>
                        <h2 className='text-2xl md:text-3xl font-semibold text-gray-800'>
                            Check hotel availability and make bookings instantly!
                        </h2>
                        <p className='mt-3 text-lg text-gray-600'>
                            Ensure your stay is comfortable and convenient.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={fadeIn('left',0)}
                        initial="hidden"
                        whileInView='show'
                        className='w-full md:w-1/2 flex justify-center'>
                        <img src={map} className='rounded-lg shadow-lg hover:scale-105 transition-transform duration-500' alt="Map showing hotel availability" />
                    </motion.div>
                </div>

                {/* Map Section 2 */}
                <div className='flex flex-col md:flex-row-reverse gap-8 md:items-center transition-transform duration-300'>
                    <motion.div
                        variants={fadeIn('left',0)}
                        initial="hidden"
                        whileInView='show'
                        className='md:w-1/2 text-center md:text-left'>
                        <h2 className='text-2xl md:text-3xl font-semibold text-gray-800'>
                            Discover top tourist spots and hidden gems!
                        </h2>
                        <p className='mt-3 text-lg text-gray-600'>
                            Dive deep into unique experiences curated just for you.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={fadeIn('right',0)}
                        initial="hidden"
                        whileInView='show'
                        className='w-full md:w-1/2 flex justify-center'>
                        <img src={map2} className='rounded-lg shadow-lg hover:scale-105 transition-transform duration-500' alt="Map of tourist attractions" />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default About