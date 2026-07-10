import React from 'react'

import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Welcome from './Pages/tutorial/Welcome'
import Profile from './Pages/Profile/Profile'
import Map from './Components/map/Map'
import ProfileOverview from './Pages/Profile/ProfileOverview'
import ProfileSettings from './Pages/Profile/ProfileSettings'

import Error404 from './Pages/Error404'
import SkillWizard from './Pages/tutorial/SkillWizard'
import SpotsList from './Pages/Spots/SpotsList'
import Spot from './Pages/Spots/Spot'
import ChallengeDBParser from './Components/challenge/ChallengeDBParser'
import ChallengePage from './Pages/Challenge/ChallengePage'
import AllChallengePage from './Pages/Challenge/AllChallengesPage'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/spots" element={<SpotsList />} />
    <Route path="spot/:spotId" element={<Spot />} />
    <Route path="/tutorial" element={<SkillWizard />} />
    <Route path="/Home" element={<Home />} />
    <Route path="/profile" element={<Profile />}>
      <Route path="" element={<ProfileOverview />} />
      <Route path="settings" element={<ProfileSettings />} />
    </Route>
    {/* THIS CHALLENGE ROUTE ONLY FOR TESTING CHALLENGE PAGE AND PHOTOGALLERY COMPONENT PURPOSES */ }
    <Route path="/challenge" element={<ChallengePage id={1} title="Challenge" subtitle="Level: Noob" backUrl="/" />} />
    <Route path="/challenge/:id" element={<ChallengePage />} />
    <Route path="/challenges/all" element={<AllChallengePage />} />
    <Route path="*" element={<Error404 />} />
  </Routes>
)

export default AppRoutes
