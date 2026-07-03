import { React, useState } from 'react'
import { Box, Typography } from '@mui/material'

/* Prototype! */
const CommentSection = ({ challengeId }) => {
  const [comments, setComments] = useState([])
  return (
    <Box sx={{
      mt: 3
    }}
    >
      <Typography variant="h6">Kommentare</Typography>
      <Typography color="text.secondary">
        Kommentarbereich kommt später.
      </Typography>
    </Box>)
}
export default CommentSection
