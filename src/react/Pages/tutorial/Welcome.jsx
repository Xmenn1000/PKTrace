import { Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import CommonPage from '../Layouts/CommonPage'
import { useUser } from '../../../hooks/useUser'
import PickName from '../../Components/common/PickName'

const Welcome = () => {
  const { user, setName } = useUser()

  return (
    <CommonPage title="Willkommen bei PK Trace">
      <Stack
        height="100%"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{ px: 1 }}
      >
        <Typography variant="body1" textAlign="center">
          Verrate uns wie du heißen willst...
        </Typography>

        <PickName value={user?.name ?? ''} setValue={setName} />

        <Button
          component={Link}
          variant="contained"
          disabled={!user?.name}
          to="/welcome/skill"
          fullWidth
        >
          Weiter
        </Button>
      </Stack>
    </CommonPage>
  )
}

export default Welcome
