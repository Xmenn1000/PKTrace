import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button, CardContent, Typography, Stack, Card, Box } from '@mui/material'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import CommentSection from '../commentSection/CommentSection'
import CommonPage from '../../Pages/CommonPage'
import Stopwatch from '../stopwatch/Stopwatch'

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
    <Box sx={{
      height: '100vh',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch'
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
        <Box sx={{
          pb: 1,
          width: '100%',
          '& .swiper-pagination': {
            bottom: '-20px !important'
          } }}
        >
          <Swiper modules={[Pagination]} pagination={{ el: '.challenge-pagination', clickable: true }}>
            {images.map((image) => (
              <SwiperSlide key={image.url}>
                <Box
                  component="img"
                  src={image.url}
                  alt={alt}
                  sx={{
                    width: '100%',
                    height: 280,
                    objectFit: 'cover',
                    display: 'block',
                    borderRadius: 2
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Box className="challenge-pagination" sx={{ display: 'flex', justifyContent: 'center', mt: 1 }} />
        </Box>

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
