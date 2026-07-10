import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Welcome from './Pages/tutorial/Welcome'
import WelcomeSkill from './Pages/tutorial/WelcomeSkill'
import SkillResult from './Pages/tutorial/SkillResult'
import Profile from './Pages/Profile/Profile'
import Map from './Components/map/Map'
import ProfileOverview from './Pages/Profile/ProfileOverview'
import ProfileSettings from './Pages/Profile/ProfileSettings'

import Error404 from './Pages/Error404'
import StartScreen from './Pages/StartScreen/StartScreen'
import SkillWizard from './Pages/tutorial/SkillWizard'
import SpotsList from './Pages/Spots/SpotsList'
import Spot from './Pages/Spots/Spot'
import ChallengeDBParser from './Components/challenge/ChallengeDBParser'
import ChallengePage from './Pages/Challenge/ChallengePage'
import { useUser } from '../hooks/useUser'

const ProtectedRoute = ({ element }) => {
  const { user } = useUser()
  return user ? element : <Navigate to="/" replace />
}

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/welcome/skill" element={<WelcomeSkill />} />
    <Route path="/tutorial" element={<SkillWizard />} />
    <Route path="/tutorial/result" element={<SkillResult />} />
    <Route path="/start" element={<ProtectedRoute element={<StartScreen />} />} />
    <Route path="/spots" element={<ProtectedRoute element={<SpotsList />} />} />
    <Route path="spot/:spotId" element={<ProtectedRoute element={<Spot />} />} />
    <Route path="/Home" element={<ProtectedRoute element={<Home />} />} />
    <Route path="/profile" element={<ProtectedRoute element={<Profile />} />}>
      <Route path="" element={<ProfileOverview />} />
      <Route path="settings" element={<ProfileSettings />} />
    </Route>
    {/* THIS CHALLENGE ROUTE ONLY FOR TESTING CHALLENGE PAGE AND PHOTOGALLERY COMPONENT PURPOSES */ }
    <Route path="/challenge" element={<ChallengePage id={1} title="Challenge" subtitle="Level: Noob" backUrl="/" />} />
    <Route path="/challenges/all" element={<ProtectedRoute element={<ChallengePage />} />} />
    <Route path="*" element={<Error404 />} />
  </Routes>
)

export default AppRoutes
