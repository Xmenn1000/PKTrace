import { Divider, IconButton, Typography, Box } from '@mui/material'
import { Stack } from '@mui/system'
import React, { Children } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PropTypes from 'prop-types'

// https://bobbyhadz.com/blog/react-router-go-back-to-previous-page
const CommonPage = ({ title, subtitle, headerAktions, backUrl, showGoBack, children }) => {
  const navigate = useNavigate()
  const backButton = () => {
    if (backUrl) {
      return (
        <IconButton component={Link} to={backUrl}>
          <ArrowBackIcon />
        </IconButton>
      )
    }
    if (showGoBack) {
      return (
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
      )
    }
    return null
  }

  return (
    <Stack
      flex="1 1 auto"
      spacing={1}
      alignItems="center"
      justifyContent="space-between"
      width={320}
      minHeight={0}
      marginY="20px"
    >
      <Stack width="100%" spacing={1}>
        <Stack direction="row" spacing={1} display="grid" gridTemplateColumns="1fr auto 1fr" justifyContent="center" alignItems="center">
          <Box sx={{ justifySelf: 'start' }}>
            {backButton()}
          </Box>
          <Stack>
            <Typography variant="h5" textAlign="center">
              {title}
            </Typography>
            <Typography variant="h6" textAlign="center">
              {subtitle}
            </Typography>
          </Stack>
          {headerAktions}
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

    </Stack>
  )
}

CommonPage.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  headerAktions: PropTypes.element,
  backUrl: PropTypes.string,
  showGoBack: PropTypes.bool,
  children: PropTypes.element
}

export default CommonPage
