import React, { useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import {
  Stack,
  Typography,
  Container,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Snackbar,
  Alert
} from '@mui/material'

import {
  HealthAndSafety as HomeIcon,
  Person4 as ProfileIcon
} from '@mui/icons-material'
import MapIcon from '@mui/icons-material/Map'

import AppRoutes from './AppRoutes'
import { useUser } from '../hooks/useUser'

import AppLogo from '../assets/favicon.svg'

const borderRadius = 6

const AppLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useUser()
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const isLoggedIn = !!user

  let navigationIndex = 0
  if (location.pathname.startsWith('/spots') || location.pathname.startsWith('/spot/')) navigationIndex = 1
  if (location.pathname.startsWith('/profile')) navigationIndex = 2

  const handleNav = (path) => {
    if (!isLoggedIn) {
      setSnackbarOpen(true)
      return
    }
    navigate(path)
  }

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{
        width: '100%',
        height: '100%',
        paddingTop: theme => theme.spacing(5),
        paddingBottom: theme => theme.spacing(5)
      }}
    >
      <Container
        maxWidth="xs"
        disableGutters
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginBottom={2}
        >
          <img
            src={AppLogo}
            alt="App Logo"
            style={{
              width: '40px',
              height: '40px'
            }}
          />
          <Typography variant="h5">
            Mobile Health: PK Trace
          </Typography>
        </Stack>
        <Paper
          elevation={6}
          sx={{
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 2,
            paddingRight: 1,
            paddingBottom: 2,
            paddingLeft: 1,
            overflow: 'hidden',
            borderRadius: theme => theme.spacing(borderRadius),
            background: theme => theme.palette.grey[900]
          }}
        >
          <Stack
            flex="1 1 auto"
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              overflow: 'hidden',
              borderRadius: theme => theme.spacing(borderRadius),
              background: theme => theme.palette.background.paper
            }}
          >
            <AppRoutes />
            <BottomNavigation
              showLabels
              value={navigationIndex}
              sx={{ width: '100%' }}
            >
              <BottomNavigationAction
                label="Home"
                icon={<HomeIcon />}
                onClick={() => handleNav('/start')}
              />
              <BottomNavigationAction
                label="Locations"
                icon={<MapIcon />}
                onClick={() => handleNav('/spots')}
              />
              <BottomNavigationAction
                label="Profile"
                icon={<ProfileIcon />}
                onClick={() => handleNav('/profile')}
              />
            </BottomNavigation>
          </Stack>
        </Paper>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="warning" onClose={() => setSnackbarOpen(false)}>
          Bitte melde dich zuerst an, bevor du die Navigation verwendest.
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default AppLayout
