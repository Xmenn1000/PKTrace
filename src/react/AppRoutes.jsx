import React from 'react'

import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Welcome from './Pages/tutorial/Welcome'
import CatNames from './Pages/CatNames/CatNames'
import Profile from './Pages/Profile/Profile'
import ProfileOverview from './Pages/Profile/ProfileOverview'
import ProfileSettings from './Pages/Profile/ProfileSettings'

import Error404 from './Pages/Error404'
import SkillWizard from './Pages/tutorial/SkillWizard'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/tutorial" element={<SkillWizard />} />
    <Route path="/Home" element={<Home />} />
    <Route path="/profile" element={<Profile />}>
      <Route path="" element={<ProfileOverview />} />
      <Route path="settings" element={<ProfileSettings />} />
    </Route>
    <Route path="/catnames" element={<CatNames />} />
    <Route path="*" element={<Error404 />} />
  </Routes>
)

export default AppRoutes
