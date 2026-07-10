import { Divider, IconButton, Typography, Box } from '@mui/material'
import { Stack } from '@mui/system'
import React, { Children } from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PropTypes from 'prop-types'

const CommonPage = ({ title, subtitle, headerAktions, backUrl, children }) => (
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
          {backUrl && <IconButton component={Link} to={backUrl}>
            <ArrowBackIcon />
          </IconButton>}
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

CommonPage.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  headerAktions: PropTypes.element,
  backUrl: PropTypes.string,
  children: PropTypes.element
}

export default CommonPage
