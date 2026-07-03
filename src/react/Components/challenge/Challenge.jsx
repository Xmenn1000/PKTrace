import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Button, CardContent, Typography, Stack } from '@mui/material'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Box } from '@mui/system'
import CommentSection from '../commentSection/CommentSection'

const Challenge = ({ title, descriptions = [], level, images = [], onStart }) => {
  const alt = 'Image not Found!'
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0)
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
    <Box sx={{ maxWidth: 300, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h5" fontWeight={700} align="center">
              {title}
            </Typography>

            <Typography variant="h6" align="center" fontSize={14}>
              {level}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Button onClick={() => handleNextDescription(-1)}>{"<"}</Button>
              <Typography color="text.secondary">{currentDescription}</Typography>
              <Button onClick={() => handleNextDescription(1)}>{">"}</Button>
            </Stack>
          </Box>

          <Box>
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
            >
              {images.map((image) => (
                <SwiperSlide key={image.url}>
                  <Box
                    component="img"
                    src={image.url}
                    alt={alt}
                    sx={{
                      width: '100%',
                      height: '300px',
                      borderRadius: 2
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>

          <Button variant="contained" onClick={onStart}>
            Start Challenge
          </Button>
        </Stack>
      </CardContent>
    </Box>
  )
}

Challenge.propTypes = {
  title: PropTypes.string.isRequired,
  descriptions: PropTypes.arrayOf(PropTypes.string),
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired
  })),
  level: PropTypes.string.isRequired,
  onStart: PropTypes.func
}

export default Challenge
