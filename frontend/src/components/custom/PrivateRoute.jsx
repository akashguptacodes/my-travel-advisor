import React from 'react'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'

function PrivateRoute({loggedIn, children}) {
    if(loggedIn){
        return children
    }
    else{
        setTimeout(() => {
            toast.error("You must be logged in to view this page")
        }, 1000)
        return <Navigate to = '/' />

    }
}

export default PrivateRoute