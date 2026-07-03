import { Divider, IconButton, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { Children } from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PropTypes from 'prop-types'

const CommonPage = ({ title, subtitle, headerAktions, backUrl, showHome, children }) => (
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
      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
        {backUrl && <IconButton component={Link} to={backUrl}>
          <ArrowBackIcon />
        </IconButton>}
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

    {showHome && <Stack spacing={1.5} sx={{ width: '100%' }} justifyContent="center" alignItems="center">
      <Divider sx={{ borderBottomWidth: 5, width: '100%', marginTop: '10px' }} />
      <IconButton
        component={Link}
        to="/"
        sx={{ width: '40px'
        }}
      >
        <HomeIcon />
      </IconButton>
    </Stack>}
  </Stack>
)

CommonPage.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  headerAktions: PropTypes.element,
  backUrl: PropTypes.string,
  showHome: PropTypes.bool,
  children: PropTypes.element
}

CommonPage.defaultProps = {
  showHome: true
}

export default CommonPage
