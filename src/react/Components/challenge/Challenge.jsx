import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button, CardContent, Typography, Stack, Card, Box } from '@mui/material'
import { Pagination } from 'swiper/modules'
import PhotoGallery from '../photos/PhotoGallery'
import 'swiper/css'
import 'swiper/css/pagination'
import CommentSection from '../commentSection/CommentSection'
import Stopwatch from '../stopwatch/Stopwatch'
import { borderRadius } from '@mui/system'

const Challenge = ({descriptions = [], images = [], commentSection, onStart }) => {
  const alt = 'Image not Found!'
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const currentDescription = descriptions[currentDescriptionIndex]
  // Use num negative for left, positive for right
  const handleNextDescription = (num) => {
    setCurrentDescriptionIndex(prev => {
      const next = prev + num

      if (next < 0) {
        return prev
      }

      if (next >= descriptions.length) {
        return prev
      }

      return next
    })
  }

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto'
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography textAlign="center" color="text.secondary">
          {currentDescription}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => handleNextDescription(-1)}>
            {'<'}
          </Button>

          <Button variant="outlined" onClick={() => handleNextDescription(1)}>
            {'>'}
          </Button>
        </Stack>
        <PhotoGallery images={images} sx={{ pb: 1 }} imageSx={{ height: 350, borderRadius: 4 }} />

        <Button variant="contained" onClick={() => setStarted(prev => !prev)}>
          {started ? 'Finish' : 'Start'}
        </Button>
        <Stopwatch isRunning={started} />
        {commentSection}
      </Stack>
    </Box>
  )
}

Challenge.propTypes = {
  descriptions: PropTypes.arrayOf(PropTypes.string),
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired
  })),
  commentSection: PropTypes.node,
  onStart: PropTypes.func
}

export default Challenge
