import React, { useState } from 'react'

import { Outlet } from 'react-router-dom'

import { Stack } from '@mui/material'
import CommonPage from '../Layouts/CommonPage'

const Profile = () => {
  const [subtitle, setSubtitle] = useState('')

  return (
    <CommonPage title="Profile" subtitle={subtitle} showGoBack>
      <Stack
        width="100%"
        height="100%"
      >
        {/* Sub-Routes of /profile like /profile/settings will mount here */}
        <Outlet context={{ setSubtitle }} />
      </Stack>
    </CommonPage>
  )
}

export default Profile
