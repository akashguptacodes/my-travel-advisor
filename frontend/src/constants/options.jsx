import hotel1 from '../assets/hotel1.jpg'
import hotel2 from '../assets/hotel2.jpg'
import hotel3 from '../assets/hotel3.jpg'
import hotel4 from '../assets/hotel4.jpg'
import hotel5 from '../assets/hotel5.jpg'
import day1 from '../assets/day1.jpg'
import day2 from '../assets/day2.jpg'
import day3 from '../assets/day3.jpg'
import day4 from '../assets/day4.jpg'
import day5 from '../assets/day5.jpg'
import day6 from '../assets/day6.jpg'
import day7 from '../assets/day7.jpg'


export const SelectTravelsList=[
    {
        id:1,
        title: 'Just Me',
        desc: 'A sole travels in exploration',
        icon: '🙋',
        people: '1 person',
    },
    {
        id:2,
        title: 'A couple',
        desc: 'Two travels in tandem',
        icon: '🥂',
        people: '2 people',
    },
    {
        id:3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏠',
        people: '3 to 5 people',
    },
    {
        id:4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekers',
        icon: '🍾',
        people: '8 to 10 people',
    },
]



export const SelectBudgetOptions=[
    {
        id:1,
        title: 'Cheap',
        desc: 'Budget-friendly',
        icon: '💸',
    },
    {
        id:2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
    },
    {
        id:3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '🤑',
    },
]

export const HotelImages = [hotel1, hotel2, hotel3, hotel4, hotel5]
export const DayImages = [day1, day2, day3, day4, day5, day6, day7]


export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {totalDays} days for {travellers} with a {budget} budget, Give me a hotels option list in which 4 to 5 hotels are there with HotelName, HotelAddress, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, PlaceDetails,Place image url, Geo Coordinates, ticket pricing, Time to travel each of the locations for {totalDays} days with each day plan with best time to visit in JSON format'