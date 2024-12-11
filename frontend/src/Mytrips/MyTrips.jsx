import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import demo from '../assets/demo.png'

function MyTrips() {
    const navigate = useNavigate()
    const [allTrips, setAlltrips] = useState([]);
    const [images, setImages] = useState({})
    const vEmail = localStorage.getItem('email')

    const fetchAllTrips = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_PORT}/api/v1/my-trips?email=${vEmail}`);
            if (!response.ok) {
                toast.error('Network response was not ok')
                return
            }
            const result = await response.json();
            setAlltrips(result?.data);
            toast.success('Here is your trips Data')
            
        }
        catch (error) {
            console.log("Error while fetching all trips", error)
            toast.error('No trips found')
        }
    }

    const fetchPlaceImage = async (query) => {
        try{
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=1&client_id=5j_yBjb8-bcmiNe5hm13npmuRRODCzkEBoq-yO8rbYk`);
            if (response.total===0) {
                toast.error('failed to load images')
                return
            }
            const result = await response.json();
            const finalImage = result?.results[0]?.urls?.full
            return finalImage;
        }
        catch(error){
            console.log(error);
            toast.error('Internal server error')
        }
    }
    const loadImages = async () =>{
        try{
            const newImages = {...images};

            for (const trip of allTrips) {
                if(!images.tripId){
                    const image = await fetchPlaceImage(trip?.formData?.Location);
                    newImages[trip.tripId] = image;
                }
            }
            setImages(newImages)
        console.log(allTrips);

        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        if (vEmail) {
            fetchAllTrips();
        }
    }, [])

    useEffect(() => {
        if (allTrips.length) {
            loadImages();
        }
    }, [allTrips]);



    return (
        <div className='flex flex-col justify-between sm:px-10 md:px-32 lg:px-56 xl:px-70 px-5'>
            {
                localStorage.getItem('email') &&
                <div className='bg-gray-100 mb-10 h-full py-5 px-8 shadow-slate-950 bg-gradient-to-r from-gray-50 to-gray-200 border-2 border-gray-300 rounded-lg'>
                    <h1 className='text-gray-700 text-4xl text-center font-bold'>🌏 Some parts of the world that you have Explored...</h1>
                    <div className='mt-10 flex flex-col gap-4 sm:grid grid-cols-2'>
                        {
                            allTrips?.map((trip, index) => (
                                <div key={index} onClick={() => {
                                        navigate('/viewtrip/' + trip?.tripId)

                                }} className=' flex flex-col gap-4 items-center rounded-lg shadow-slate-800 shadow-md sm:flex sm:flex-row hover:shadow-2xl hover:shadow-slate-800 p-4 transition-all duration-300'>
                                    <div>
                                        <img src={images[trip.tripId] || demo} className="h-40 w-40 rounded-lg hover:scale-105 transition duration-300" ></img>
                                    </div>
                                    <div>
                                        <h2 className='text-lg font-medium italic'>A Trip to {trip?.formData?.Location}</h2>
                                        <p className='font-medium text-sm'><span className='text-base font-semibold underline'>Name </span>: {trip?.formData?.Name}</p>
                                        <div className='flex flex-col gap-1 items-start mt-2'>
                                            <button className='font-light border-2 border-gray-400 rounded-full px-2 inline-block'>{trip?.formData?.Budget} Budget</button>
                                            <button className='font-light border-2 border-gray-400 rounded-full px-2 inline-block'>{trip?.formData?.Days} Days</button>
                                            <button className='font-light border-2 border-gray-400 rounded-full px-2 inline-block'>{trip?.formData?.Travellers}</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }

        </div>
    )
}

export default MyTrips