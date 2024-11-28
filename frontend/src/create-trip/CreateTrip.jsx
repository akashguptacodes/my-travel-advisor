import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import newLogo2 from '../assets/newLogo2.jpg'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast';
import Spinner from '@/components/custom/Spinner';
import { FaLocationDot } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';


function CreateTrip(props) {
  let loggedIn = props.loggedIn;
  let setLoggedIn = props.setLoggedIn;

  const navigate = useNavigate();

  let tripId;
  const [AiTripDone, setAiTripDone] = useState(false);
  const [formData, setFormData] = useState({});
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [tripData, setTripData] = useState({
    userEmail:`${localStorage.getItem('email')}`,
    tripId: '',
    formData: {},
    hotels: [],
    itinerary: {},
  });
  const [processing, setProcessing] = useState(false)



  const fetchSuggestions = async (input) => {
    if(!input){
      setSuggestions([])
      return;
    }
    const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(input)}&limit=5`)
    const data = await response.json();

    if(data && data.features){
      setSuggestions(data.features);
    }
    else{
      setSuggestions([])
    }
  }

  const handleSuggestionClick = async (suggestion) => {
    const name = suggestion.properties.name;
    const country = suggestion.properties.country;
    const newQuery = `${name}, ${country}`
    setQuery(newQuery);
    handleInputChange('Location',newQuery)
    setSuggestions([]);
  };


  const placeHandler =async (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    fetchSuggestions(newQuery);
    handleInputChange('Location',newQuery)
  }
  const handleInputChange = (name,value) => {
          setFormData({
        ...formData,
        [name]: value
      })
  }

  const submitHandler = async () => {
    if (!loggedIn) {
      const user = await authenticateUserWithGoogle()
      setOpenDialog(false);
      // console.log(user);
    }
  }

  const LogoutHandler = async () => {
    googleLogout();
    setLoggedIn(false);
    localStorage.clear()
    toast.success('Logged out but visit us whenever you need')
  }
  const LoginHandler = async () => {
    authenticateUserWithGoogle();
  }

  const authenticateUserWithGoogle = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError:(error) => console.log(error)
  })

  const GetUserProfile = (tokenInfo) => {
    axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json'
        }
      }
    ).then((resp) => {
      console.log(resp);
      setLoggedIn(true)
      setOpenDialog(false)
      localStorage.setItem('email', resp?.data?.email)
      localStorage.setItem('name', resp?.data?.name)
      localStorage.setItem('profilepic', resp?.data?.picture)
      localStorage.setItem('given_name', resp?.data?.given_name)
      localStorage.setItem('loggedIn', true)
      tripData.userEmail = localStorage.getItem('email')
    })
  }


  const OnGenerateTrip = async () => {
    if (!loggedIn) {
      toast.success('Providing you a popup, please login here')
      setOpenDialog(true)
      return;
    }
    if (formData?.Days < 8 && formData?.Days > 0 && formData?.Location && formData?.Budget && formData?.Travellers) {
      console.log(formData)
      const FINAL_PROMT = AI_PROMPT
        .replace('{location}', formData?.Location)
        .replace('{budget}', formData?.Budget)
        .replace('{travellers}', formData?.Travellers)
        .replace('{totalDays}', formData?.Days)

      setProcessing(true);
      const result = await chatSession.sendMessage(FINAL_PROMT);
      // console.log(result)

      const ans = result?.response.text();
      // console.log(ans)

      const finalAns = await JSON.parse(ans.trim());
      // console.log(finalAns)


      const hotels = await finalAns.hotelOptions;
      const itinerary = await finalAns.itinerary;
      tripId = Date.now().toString();


      // Prepare data to send to the backend
      setTripData({
        ...tripData,
        tripId: tripId,
        formData: formData,
        hotels: hotels,
        itinerary: itinerary,
      });
    }
    else {
      toast.error('Please fill all the fields')
    }
    if (formData?.Days > 8) {
      toast.error("Please enter days less than 8")
    }
    if (formData?.Days < 1) {
      toast.error("Please enter a valid number of days")
    }
    setProcessing(false);
    setAiTripDone(true)
  }
  const savetrip = async (tripData,tripId) => {
    console.log(tripData)
    if (tripData) {
      try {
        const response = await axios.post('http://localhost:5000/api/v1/savetrip', tripData);
        console.log(response);

        if (response.data.success) {
          toast.success('Trip saved successfully!');
          navigate('/viewtrip/' + tripData?.tripId)
        }
      } catch (error) {
        console.error('Error saving trip:', error);
        toast.success('Just one step away, Check details once more then Generate Trip');
      }
    }
  }

  return (
    <div className='py-1 sm:px-10 md:px-32 lg:px-56 xl:px-70 px-5'>
      <div className='flex flex-col bg-gray-100 mb-10 justify-between shadow-slate-950 p-10'>
        <div className='absolute right-5'>
          {
            loggedIn ? (<button className='bg-red-600 py-1 px-6 rounded text-gray-100 font-semibold hover:bg-red-300 hover:text-gray-900 hover:font-semibold hover:border-none transition duration-300' onClick={LogoutHandler}>Log out</button>)
              : (
                <button className='bg-green-600 py-1 px-6 rounded text-gray-100 font-semibold hover:bg-green-300 hover:text-gray-900 hover:font-semibold hover:border-none transition duration-300' onClick={LoginHandler}>Log In</button>
              )
          }
        </div>

        <h2 className='font-bold text-4xl text-center text-gray-800'>Tell us about your plan ✈️</h2>
        <p className='mt-3 text-gray-600 text-lg text-center'>Just tell us what is in your mind and we will give you the best facilities and features...</p>

        <div className='flex flex-col gap-10'>
          <div className='mt-20'>
            <h2 className='text-xl my-3 font-medium'>"Hey there, What should we call you?"</h2>
            <input type='text' className='bg-gray-200 py-1 px-2 rounded border-b-2 border-b-gray-700 focus:outline-none w-[70%]' onChange={(e) => { handleInputChange('Name', e.target.value) }
            }></input>
          </div>
          <div className='10'>
            <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
            <div>
                <input
                  type="text"
                  value={query}
                  onChange={(event)=>placeHandler(event)}
                  placeholder="Search for a location..."
                  className='bg-gray-200 py-1 px-2 border-b-2 border-gray-700 rounded w-[70%] focus:outline-none'
                />
                <ul>
                  {suggestions.map((suggestion, index) => (
                  <li key={index}
                      className='bg-gray-300 px-2 py-1 mb-1 rounded hover:bg-gray-400 transition duration-300'
                      onClick={() => handleSuggestionClick(suggestion)}
                      style={{ cursor: 'pointer' }}>
                  <FaLocationDot className='inline-block'/> {suggestion.properties.name}, {suggestion.properties.country}
                  </li>
                  ))}
                </ul>
            </div>
          </div>

          <div>
            <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
            <input type='number' placeholder='Ex-3' onChange={(e) => { handleInputChange('Days', e.target.value) }} className='bg-gray-200 py-1 px-2 rounded border-b-2 border-b-gray-700 focus:outline-none w-[70%]'></input>
          </div>
        </div>

        <div className='mt-20'>
          <h2 className='text-xl my-3 font-medium'>Tell us about your budget?</h2>
          <p className='text-gray-600 text-sm font-medium'>Just asking to get an idea to plan activities for you...</p>
          <div className='xs:flex xs:flex-col sm:flex sm:flex-col md:grid lg:grid xl:grid grid-cols-3 gap-5 mt-5'>
            {
              SelectBudgetOptions.map((item, index) => (
                <div key={index} onClick={() => { handleInputChange('Budget', item.title) }}
                  className={` bg-gray-200 cursor-pointer flex flex-col gap-2 px-8 py-4 border-[2px]
                          border-gray-300 rounded-lg hover:shadow-xl hover:scale-105 transition duration-300
                          ${formData.Budget === item.title && 'shadow-2xl scale-105 border-gray-900'}`}>
                  <h2 className='text-3xl'>{item.icon}</h2>
                  <h2 className='text-base font-bold'>{item.title}</h2>
                  <h2 className='text-sm text-gray-800'>{item.desc}</h2>
                </div>
              ))
            }
          </div>
        </div>

        <div className='mt-20'>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
          <div className='xs:flex xs:flex-col sm:flex sm:flex-col md:grid lg:grid xl:grid grid-cols-3 gap-5 mt-5'>
            {
              SelectTravelsList.map((item, index) => (
                <div key={index} onClick={() => { handleInputChange('Travellers', item.people) }}
                  className={`bg-gray-200 cursor-pointer flex flex-col gap-2 px-8 py-2 border-[2px] border-gray-300
                            rounded-lg hover:shadow-xl hover:scale-105 transition duration-300
                            ${formData.Travellers === item.people && 'shadow-2xl scale-105 border-gray-900'}`}>
                  <h2 className='text-2xl'>{item.icon}</h2>
                  <h2 className='text-base font-bold'>{item.title}</h2>
                  <h2 className='text-sm text-gray-800'>{item.desc}</h2>
                  <h2 className='text-sm text-gray-800'>{item.people}</h2>
                </div>
              ))
            }
          </div>
        </div>

        <div className='my-10 flex gap-5'>
          <button onClick={OnGenerateTrip} className='font-semibold px-8 py-2 rounded bg-gray-300 hover:text-gray-200 border-2 border-green-500 hover:bg-gray-700 transition duration-300 ease-in-out hover:border-none'>
            {
              processing ? (<Spinner />) : ('Generate Trip')
            }
          </button>
            {
              AiTripDone &&
              <button onClick={()=>savetrip(tripData,tripId)} className='font-semibold px-8 py-2 rounded bg-gray-300 hover:text-gray-200 border-2 border-green-500 hover:bg-gray-700 transition duration-300 ease-in-out hover:border-none'>Review trip ➡️</button>
            }
        </div>

        <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <div className='flex justify-center'>
                  <img src={newLogo2} className='h-20'></img>
                </div>
                <h2 className='text-base font-bold text-gray-900'>Sign in with google</h2>
                <p className='text-sm font-normal'>Sign in to the app with google authentication securely</p>
                <button onClick={submitHandler} className='flex items-center justify-center gap-2 bg-yellow-500 text-black border-t-red-600 border-t-2 border-l-yellow-600 border-l-2 border-b-green-600 border-b-2 border-r-blue-600 border-r-2 rounded-sm font-semibold w-full py-1 mt-4 hover:border-none transition duration-300'><FcGoogle fontSize='1.4rem' />Continue with google</button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default CreateTrip