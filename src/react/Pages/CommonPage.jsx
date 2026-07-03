import { Divider, IconButton, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { Children } from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const CommonPage = ({ title, subtitle, backUrl, children }) => (
  <Stack
    flex="1 1 auto"
    spacing={1}
    alignItems="center"
    justifyContent="space-between"
    width={320}
    minHeight={0}
    marginY="5px"
  >
    <Stack width="100%" spacing={1}>
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
        <IconButton component={Link} to={backUrl}>
          <ArrowBackIcon />
        </IconButton>
        <Stack>
          <Typography variant="h5" textAlign="center">
            {title}
          </Typography>
          <Typography variant="h6" textAlign="center">
            {subtitle}
          </Typography>
        </Stack>
      </Stack>
      <Divider sx={{ borderBottomWidth: 5, width: '100%' }} />
    </Stack>

    <Stack
      width="100%"
      flex="1 1 auto"
      minHeight={0}
    >
      {children}
    </Stack>

    <Stack spacing={1.5} sx={{ width: '100%' }}>
      <Divider sx={{ borderBottomWidth: 5, width: '100%', marginTop: '10px' }} />
      <IconButton component={Link} to="/">
        <HomeIcon />
      </IconButton>
    </Stack>
  </Stack>
)

export default CommonPage
