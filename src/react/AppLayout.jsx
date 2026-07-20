import React, { useState, useRef } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import {
  Stack,
  Typography,
  Container,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
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
  const { isUserValid } = useUser()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const timerRef = useRef(null)

  const showError = () => {
    setSnackbarOpen(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setSnackbarOpen(false), 3000)
  }

  const isLoggedIn = isUserValid()

  let navigationIndex = 0
  if (location.pathname.startsWith('/spots') || location.pathname.startsWith('/spot/')) navigationIndex = 1
  if (location.pathname.startsWith('/profile')) navigationIndex = 2

  const handleNav = (path) => {
    if (!isLoggedIn) {
      showError()
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
            position: 'relative',
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
          {snackbarOpen && (
            <Alert
              severity="warning"
              onClose={() => setSnackbarOpen(false)}
              sx={{
                position: 'absolute',
                bottom: 64,
                left: 8,
                right: 8,
                zIndex: 10,
                borderRadius: 2,
                boxShadow: 3
              }}
            >
              Bitte gib zuerst deinen Namen und dein Skill-Level an!
            </Alert>
          )}
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
    </Stack>
  )
}

export default AppLayout
