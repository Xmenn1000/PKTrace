import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../../../hooks/useUser'

// https://medium.com/@dineshjalagam/securing-your-react-application-implementing-route-guards-with-react-router-1ed9d11518e5
// https://dev.to/abhay_yt_52a8e72b213be229/implementing-route-guards-in-react-protecting-your-routes-with-authentication-and-roles-4leh
const TutorialGuard = ({ element }) => {
  const { user, isUserValid } = useUser()
  if (!isUserValid()) {
    if (!user?.name) return <Navigate to="/" replace />
    if (!user?.skillLevel) return <Navigate to="/welcome/skill" replace />
  }
  return element
}

export default TutorialGuard
