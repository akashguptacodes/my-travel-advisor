import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';
import demo from '../assets/demo.png'
import { FaLocationDot } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { HotelImages } from '@/constants/options';
import { DayImages } from '@/constants/options';

function ViewTrip() {

    const { tripId } = useParams();
    const [trip, setTrip] = useState({});
    const navigate = useNavigate()


    async function deleteHandler() {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_PORT}/api/v1/delete-trip/${tripId}`)
            const data = await response.json()
            toast.success('Trip data deleted')
            navigate('/mytrips')
            console.log(data)
        }
        catch (error) {
            console.log("Error while deleteing trip", error);
        }
    }
    const fetchTrip = async (tripId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_PORT}/api/v1/view-trip/${tripId}`)
            toast.success('Review your trip')
            if (!response.ok) {
                toast.error('Network response was not ok')
            }
            const result = await response.json()
            const finalResult = await result.data;
            setTrip(finalResult)
            // console.log(finalResult);
        }
        catch (error) {
            console.log("Error in fetching data", error.message)
            toast.error('Error occured while fetching trip')
        }
    }

    useEffect(() => {
        fetchTrip(tripId);
    }, [tripId])

    return (
        <div className='py-1 sm:px-10 md:px-32 lg:px-56 xl:px-70 px-5'>
            <div className='mb-20'>
                <div className='px-5 pb-5 bg-gray-100 rounded'>
                    <h1 className='font-bold text-4xl text-gray-800 text-center pt-5'>Hey! welcome review your trip that we have planned for you</h1>
                    <div className='flex flex-col sm:flex sm:flex-row gap-6 mt-14'>
                        <div>
                            <img src={demo} className='rounded-xl h-[100%] w-full'></img>
                        </div>
                        <div className="bg-transparent shadow-2xl rounded-3xl p-6 w-full max-w-md mx-auto border-2 h-full">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Trip Information</h2>
                            <div className="border-t border-gray-200 pt-4">
                                <p className="border-b-2 border-l-2 px-1 rounded-md text-xl font-medium">
                                    <span className="font-medium text-gray-900 text-xl">Hii ! </span> {trip?.formData?.Name}
                                </p>
                                <p className="text-gray-700 mt-2 border-b-2 border-l-2 px-1 rounded-md">
                                    <span className="font-medium text-gray-900">Location: </span> {trip?.formData?.Location}
                                </p>
                                <p className="text-gray-700 mt-2 border-b-2 border-l-2 px-1 rounded-md">
                                    <span className="font-medium text-gray-900">Budget:</span> {trip?.formData?.Budget}
                                </p>
                                <p className="text-gray-700 mt-2 border-b-2 border-l-2 px-1 rounded-md">
                                    <span className="font-medium text-gray-900">Days:</span> {trip?.formData?.Days} days
                                </p>
                                <p className="text-gray-700 mt-2 border-b-2 border-l-2 px-1 rounded-md">
                                    <span className="font-medium text-gray-900">Travellers:</span> {trip?.formData?.Travellers}
                                </p>
                                <div className='flex justify-end'>
                                    <button onClick={deleteHandler} className='flex items-center gap-1 font-semibold bg-red-600 px-4 py-1 mt-5 border-none hover:bg-red-500'><MdDelete className='inline-block text-xl' /><span>Delete Trip</span></button>
                                </div>
                                <div>
                                    <h1 className='text-center text-2xl mt-10 font-bold text-gray-800'>🔻 Scroll down to see details</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-5 bg-gray-100 shadow-2xl px-6 py-3 rounded-lg'>
                    <h2 className='text-2xl font-semibold'>🏨 Famous Hotels in {trip.formData?.Location} to stay</h2>
                    <div className='mt-3'>
                        {
                            trip.hotels?.map((hotel, index) => (
                                <Link to={'https://www.google.com/maps/search/?api=1&query=Hotel ' + hotel.hotelName + ' ' + hotel.hotelAddress} target='_blank' key={index} style={{ color: 'inherit', textDecoration: 'none' }}>
                                    <div key={index} className='flex flex-col sm:flex sm:flex-row items-center gap-7 mb-4 py-3 px-3 rounded-md border-2 shadow-lg hover:shadow-slate-500 hover:shadow-2xl transition duration-300'>
                                        <div>
                                            <img src={HotelImages[index]} className="w-80 h-40 rounded-lg object-cover transition-transform duration-200 hover:scale-105"></img>
                                        </div>
                                        <div className='w-full'>
                                            <h3 className='font-semibold text-xl underline'>{hotel.hotelName}</h3>
                                            <p className='text-base font-light'>📍 <span className='font-medium'>Address: </span>{hotel.hotelAddress}</p>
                                            <p className='text-base italic font-light'>🗒️ <span className='font-medium'>Description: </span>{hotel.description}</p>
                                            <p className='font-light'>💰 <span className='font-medium text-green-600'>Price: </span>{hotel.price}</p>
                                            <p>⭐{hotel.rating}<span className='font-medium'> Rating</span></p>
                                            <p className='font-light'><span className='font-medium'><FaLocationDot className='inline-block' /> Location: </span>{hotel.geoCoordinates}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>

                <div className='bg-gray-100 my-10 shadow-2xl border-2 py-3 px-7 rounded-lg'>
                    <h1 className='text-2xl font-semibold'>📝 A full Scheduled plan for you:</h1>
                    {
                        trip.itinerary?.day1?.plan?.length == 0 ? ('') : (
                            <div className='mt-5 border-1 px-4 py-2 rounded-lg shadow-lg'>
                                <h2 className='font-bold text-xl ml-1'>Day 1</h2>
                                <h2 className='font-semibold bg-gradient-to-br from-gray-300 to-gray-700 text-black mt-3 px-2 py-1 border-2 border-gray-500 inline-block rounded-full'>BestTime :- {trip?.itinerary?.day1?.bestTime}</h2>
                                <div className='flex flex-col sm:grid sm:grid-cols-3 gap-4 my-3'>
                                    {
                                        trip.itinerary?.day1?.plan.map((pl, index) => (
                                            <Link to={'https://www.google.com/maps/search/?api=1&query=' + pl.placeName + ' ' + pl.geoCoordinates} target='_blank' key={index} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                <div key={index} className='flex flex-col justify-center gap-1 border-2 px-4 py-3 h-full w-full rounded-md hover:shadow-slate-900 shadow-2xl transition duration-300'>
                                                    <div>
                                                        <img src={DayImages[0]} className='h-60 rounded-full shadow-lg hover:scale-105 transition duration-300'></img>
                                                    </div>
                                                    <h2 className='font-medium text-lg underline'>{pl.placeName}</h2>
                                                    <p className='italic text-sm'><span className='font-medium text-base'>✨ Description: </span>{pl.placeDetails}</p>
                                                    <p><span className='font-semibold text-green-700'>✨ Charge: </span>{pl.ticketPricing}</p>
                                                    <p><span className='font-semibold'>✨ Time to explore: </span>{pl.timeToTravel}</p>
                                                    <p><span className='font-semibold'>✨ Location: </span>{pl.geoCoordinates}</p>
                                                    <button className='bg-green-500 py-3 text-lg rounded-full mt-2 hover:bg-gradient-to-r from-green-400 to-green-600 transition duration-300'>Click to get a Map view !</button>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        trip.itinerary?.day2?.plan?.length == 0 ? ('') : (
                            <div className='mt-5 border-1 px-4 py-2 rounded-lg shadow-lg'>
                                <h2 className='font-bold text-xl ml-1'>Day 2</h2>
                                <h2 className='font-semibold bg-gradient-to-br from-gray-300 to-gray-700 text-black mt-3 px-2 py-1 border-2 border-gray-500 inline-block rounded-full'>BestTime :- {trip?.itinerary?.day1?.bestTime}</h2>
                                <div className='flex flex-col sm:grid sm:grid-cols-3 gap-4 my-3'>
                                    {
                                        trip.itinerary?.day2?.plan.map((pl, index) => (
                                            <Link to={'https://www.google.com/maps/search/?api=1&query=' + pl.placeName + ' ' + pl.geoCoordinates} target='_blank' key={index} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                <div key={index} className='flex flex-col justify-center gap-1 border-2 px-4 py-3 h-full w-full rounded-md hover:shadow-slate-900 shadow-2xl transition duration-300'>
                                                    <div>
                                                        <img src={DayImages[1]} className='h-60 w-full rounded-full shadow-lg hover:scale-105 transition duration-300'></img>
                                                    </div>
                                                    <h2 className='font-medium text-lg underline'>{pl.placeName}</h2>
                                                    <p className='italic text-sm'><span className='font-medium text-base'>✨ Description: </span>{pl.placeDetails}</p>
                                                    <p><span className='font-semibold text-green-700'>✨ Charge: </span>{pl.ticketPricing}</p>
                                                    <p><span className='font-semibold'>✨ Time to explore: </span>{pl.timeToTravel}</p>
                                                    <p><span className='font-semibold'>✨ Location: </span>{pl.geoCoordinates}</p>
                                                    <button className='bg-green-500 py-3 text-lg rounded-full mt-2 hover:bg-gradient-to-r from-green-400 to-green-600 transition duration-300'>Click to get a Map view !</button>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        trip.itinerary?.day3?.plan?.length == 0 ? ('') : (
                            <div className='mt-5 border-1 px-4 py-2 rounded-lg shadow-lg'>
                                <h2 className='font-bold text-xl ml-1'>Day 3</h2>
                                <h2 className='font-semibold bg-gradient-to-br from-gray-300 to-gray-700 text-black mt-3 px-2 py-1 border-2 border-gray-500 inline-block rounded-full'>BestTime :- {trip?.itinerary?.day1?.bestTime}</h2>
                                <div className='flex flex-col sm:grid sm:grid-cols-3 gap-4 my-3'>
                                    {
                                        trip.itinerary?.day3?.plan.map((pl, index) => (
                                            <Link to={'https://www.google.com/maps/search/?api=1&query=' + pl.placeName + ' ' + pl.geoCoordinates} target='_blank' key={index} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                <div key={index} className='flex flex-col justify-center gap-1 border-2 px-4 py-3 h-full w-full rounded-md hover:shadow-slate-900 shadow-2xl transition duration-300'>
                                                    <div>
                                                        <img src={DayImages[2]} className='h-60 w-full rounded-full shadow-lg hover:scale-105 transition duration-300'></img>
                                                    </div>
                                                    <h2 className='font-medium text-lg underline'>{pl.placeName}</h2>
                                                    <p className='italic text-sm'><span className='font-medium text-base'>✨ Description: </span>{pl.placeDetails}</p>
                                                    <p><span className='font-semibold text-green-700'>✨ Charge: </span>{pl.ticketPricing}</p>
                                                    <p><span className='font-semibold'>✨ Time to explore: </span>{pl.timeToTravel}</p>
                                                    <p><span className='font-semibold'>✨ Location: </span>{pl.geoCoordinates}</p>
                                                    <button className='bg-green-500 py-3 text-lg rounded-full mt-2 hover:bg-gradient-to-r from-green-400 to-green-600 transition duration-300'>Click to get a Map view !</button>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        trip.itinerary?.day4?.plan?.length == 0 ? ('') : (
                            <div className='mt-5 border-1 px-4 py-2 rounded-lg shadow-lg'>
                                <h2 className='font-bold text-xl ml-1'>Day 4</h2>
                                <h2 className='font-semibold bg-gradient-to-br from-gray-300 to-gray-700 text-black mt-3 px-2 py-1 border-2 border-gray-500 inline-block rounded-full'>BestTime :- {trip?.itinerary?.day1?.bestTime}</h2>
                                <div className='flex flex-col sm:grid sm:grid-cols-3 gap-4 my-3'>
                                    {
                                        trip.itinerary?.day4?.plan.map((pl, index) => (
                                            <Link to={'https://www.google.com/maps/search/?api=1&query=' + pl.placeName + ' ' + pl.geoCoordinates} target='_blank' key={index} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                <div key={index} className='flex flex-col gap-1 border-2 px-4 py-3 h-full w-full rounded-md hover:shadow-slate-900 shadow-2xl transition duration-300'>
                                                    <div>
                                                        <img src={DayImages[3]} className='h-60 w-full rounded-full shadow-lg hover:scale-105 transition duration-300'></img>
                                                    </div>
                                                    <h2 className='font-medium text-lg underline'>{pl.placeName}</h2>
                                                    <p className='italic text-sm'><span className='font-medium text-base'>✨ Description: </span>{pl.placeDetails}</p>
                                                    <p><span className='font-semibold text-green-700'>✨ Charge: </span>{pl.ticketPricing}</p>
                                                    <p><span className='font-semibold'>✨ Time to explore: </span>{pl.timeToTravel}</p>
                                                    <p><span className='font-semibold'>✨ Location: </span>{pl.geoCoordinates}</p>
                                                    <button className='bg-green-500 py-3 text-lg rounded-full mt-2 hover:bg-gradient-to-r from-green-400 to-green-600 transition duration-300'>Click to get a Map view !</button>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        trip.itinerary?.day5?.plan?.length == 0 ? ('') : (
                            <div className='mt-5 border-1 px-4 py-2 rounded-lg shadow-lg'>
                                <h2 className='font-bold text-xl ml-1'>Day 5</h2>
                                <h2 className='font-semibold bg-gradient-to-br from-gray-300 to-gray-700 text-black mt-3 px-2 py-1 border-2 border-gray-500 inline-block rounded-full'>BestTime :- {trip?.itinerary?.day1?.bestTime}</h2>
                                <div className='flex flex-col sm:grid sm:grid-cols-3 gap-4 my-3'>
                                    {
                                        trip.itinerary?.day5?.plan.map((pl, index) => (
                                            <Link to={'https://www.google.com/maps/search/?api=1&query=' + pl.placeName + ' ' + pl.geoCoordinates} target='_blank' key={index} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                <div key={index} className='flex flex-col gap-1 border-2 px-4 py-3 h-full w-full rounded-md hover:shadow-slate-900 shadow-2xl transition duration-300'>
                                                    <div>
                                                        <img src={DayImages[4]} className='h-60 w-full rounded-full shadow-lg hover:scale-105 transition duration-300'></img>
                                                    </div>
                                                    <h2 className='font-medium text-lg underline'>{pl.placeName}</h2>
                                                    <p className='italic text-sm'><span className='font-medium text-base'>✨ Description: </span>{pl.placeDetails}</p>
                                                    <p><span className='font-semibold text-green-700'>✨ Charge: </span>{pl.ticketPricing}</p>
                                                    <p><span className='font-semibold'>✨ Time to explore: </span>{pl.timeToTravel}</p>
                                                    <p><span className='font-semibold'>✨ Location: </span>{pl.geoCoordinates}</p>
                                                    <button className='bg-green-500 py-3 text-lg rounded-full mt-2 hover:bg-gradient-to-r from-green-400 to-green-600 transition duration-300'>Click to get a Map view !</button>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        trip.itinerary?.day6?.plan?.length == 0 ? ('') : (
                            <div className='mt-5 border-1 px-4 py-2 rounded-lg shadow-lg'>
                                <h2 className='font-bold text-xl ml-1'>Day 6</h2>
                                <h2 className='font-semibold bg-gradient-to-br from-gray-300 to-gray-700 text-black mt-3 px-2 py-1 border-2 border-gray-500 inline-block rounded-full'>BestTime :- {trip?.itinerary?.day1?.bestTime}</h2>
                                <div className='flex flex-col sm:grid sm:grid-cols-3 gap-4 my-3'>
                                    {
                                        trip.itinerary?.day6?.plan.map((pl, index) => (
                                            <Link to={'https://www.google.com/maps/search/?api=1&query=' + pl.placeName + ' ' + pl.geoCoordinates} target='_blank' key={index} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                <div key={index} className='flex flex-col gap-1 border-2 px-4 py-3 h-full w-full rounded-md hover:shadow-slate-900 shadow-2xl transition duration-300'>
                                                    <div>
                                                        <img src={DayImages[5]} className='h-60 w-full rounded-full shadow-lg hover:scale-105 transition duration-300'></img>
                                                    </div>
                                                    <h2 className='font-medium text-lg underline'>{pl.placeName}</h2>
                                                    <p className='italic text-sm'><span className='font-medium text-base'>✨ Description: </span>{pl.placeDetails}</p>
                                                    <p><span className='font-semibold text-green-700'>✨ Charge: </span>{pl.ticketPricing}</p>
                                                    <p><span className='font-semibold'>✨ Time to explore: </span>{pl.timeToTravel}</p>
                                                    <p><span className='font-semibold'>✨ Location: </span>{pl.geoCoordinates}</p>
                                                    <button className='bg-green-500 py-3 text-lg rounded-full mt-2 hover:bg-gradient-to-r from-green-400 to-green-600 transition duration-300'>Click to get a Map view !</button>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                    {
                        trip.itinerary?.day7?.plan?.length == 0 ? ('') : (
                            <div className='mt-5 border-1 px-4 py-2 rounded-lg shadow-lg'>
                                <h2 className='font-bold text-xl ml-1'>Day 7</h2>
                                <h2 className='font-semibold bg-gradient-to-br from-gray-300 to-gray-700 text-black mt-3 px-2 py-1 border-2 border-gray-500 inline-block rounded-full'>BestTime :- {trip?.itinerary?.day1?.bestTime}</h2>
                                <div className='flex flex-col sm:grid sm:grid-cols-3 gap-4 my-3'>
                                    {
                                        trip.itinerary?.day7?.plan.map((pl, index) => (
                                            <Link to={'https://www.google.com/maps/search/?api=1&query=' + pl.placeName + ' ' + pl.geoCoordinates} target='_blank' key={index} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                <div key={index} className='flex flex-col gap-1 border-2 px-4 py-3 h-full w-full rounded-md hover:shadow-slate-900 shadow-2xl transition duration-300'>
                                                    <div>
                                                        <img src={DayImages[6]} className='h-60 w-full rounded-lg shadow-lg hover:scale-105 transition duration-300'></img>
                                                    </div>
                                                    <h2 className='font-medium text-lg underline'>{pl.placeName}</h2>
                                                    <p className='italic text-sm'><span className='font-medium text-base'>✨ Description: </span>{pl.placeDetails}</p>
                                                    <p><span className='font-semibold text-green-700'>✨ Charge: </span>{pl.ticketPricing}</p>
                                                    <p><span className='font-semibold'>✨ Time to explore: </span>{pl.timeToTravel}</p>
                                                    <p><span className='font-semibold'>✨ Location: </span>{pl.geoCoordinates}</p>
                                                    <button className='bg-green-500 py-3 text-lg rounded-full mt-2 hover:bg-gradient-to-r from-green-400 to-green-600 transition duration-300'>Click to get a Map view !</button>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default ViewTrip