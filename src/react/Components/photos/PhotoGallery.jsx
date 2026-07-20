import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
/* eslint-enable import/no-unresolved */

const PhotoGallery = ({ images = [], imageSx = {}, sx = {} }) => (
  <Box
    sx={{
      width: '100%',
      maxWidth: '100%',
      minWidth: 0,
      overflow: 'hidden',
      ...sx
    }}
  >
    <Swiper
      modules={[Pagination]}
      pagination={{
        el: '.gallery-pagination',
        clickable: true
      }}
      style={{ width: '100%' }}
    >
      {images.map((image) => (
        <SwiperSlide style={{ width: '100%' }} key={image.url}>
          <Box
            component="img"
            src={image.url}
            alt={image.alt ?? 'Gallery image'}
            sx={{
              width: '100%',
              height: 280,
              objectFit: 'cover',
              display: 'block',
              borderRadius: 2,
              ...imageSx
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>

    <Box
      className="gallery-pagination"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 1
      }}
    />
  </Box>
)

PhotoGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      alt: PropTypes.string
    })
  ),
  imageSx: PropTypes.object,
  sx: PropTypes.object
}

export default PhotoGallery
