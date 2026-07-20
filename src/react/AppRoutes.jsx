import React from 'react'

import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Welcome from './Pages/tutorial/Welcome'
import WelcomeSkill from './Pages/tutorial/WelcomeSkill'
import SkillResult from './Pages/tutorial/SkillResult'
import Profile from './Pages/Profile/Profile'
import ProfileOverview from './Pages/Profile/ProfileOverview'
import ProfileSettings from './Pages/Profile/ProfileSettings'

import Error404 from './Pages/Error404'
import StartScreen from './Pages/StartScreen/StartScreen'
import SkillWizard from './Pages/tutorial/SkillWizard'
import SpotsList from './Pages/Spots/SpotsList'
import Spot from './Pages/Spots/Spot'
import ChallengePage from './Pages/Challenge/ChallengePage'
import AllChallengePage from './Pages/Challenge/AllChallengesPage'
import TutorialGuard from './Pages/tutorial/TutorialGuard'
import MyChallengesPage from './Pages/Challenge/MyChallengesPage'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/welcome/skill" element={<WelcomeSkill />} />
    <Route path="/tutorial" element={<SkillWizard />} />
    <Route path="/tutorial/result" element={<SkillResult />} />
    <Route path="/start" element={<TutorialGuard element={<StartScreen />} />} />
    <Route path="/spots" element={<TutorialGuard element={<SpotsList />} />} />
    <Route path="spot/:spotId" element={<TutorialGuard element={<Spot />} />} />
    <Route path="/Home" element={<TutorialGuard element={<Home />} />} />
    <Route path="/profile" element={<TutorialGuard element={<Profile />} />}>
      <Route path="" element={<ProfileOverview />} />
      <Route path="settings" element={<ProfileSettings />} />
    </Route>
    {/* THIS CHALLENGE ROUTE ONLY FOR TESTING CHALLENGE PAGE AND PHOTOGALLERY COMPONENT PURPOSES */ }
    <Route path="/challenge/:id" element={<ChallengePage />} />
    <Route path="/challenges/all" element={<TutorialGuard element={<AllChallengePage />} />} />
    <Route path="/challenges/my" element={<MyChallengesPage />}/>
    <Route path="*" element={<Error404 />} />
  </Routes>
)

export default AppRoutes
