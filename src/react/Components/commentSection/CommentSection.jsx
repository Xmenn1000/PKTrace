import React, { useState } from 'react'
import {
  Box,
  Typography,
  Stack,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import PropTypes from 'prop-types'

const CommentSection = ({ comments = [], onAddComment }) => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')

  const handleSubmit = () => {
    const text = input.trim()
    if (!text) return

    onAddComment?.(text)
    setInput('')
    setOpen(false)
  }

  return (
    <Paper sx={{ mt: 3, p: 2, borderRadius: 4, width: '100%' }}>
      <Stack spacing={1.5}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2" fontWeight={700}>
            Bewertungen
            {' '}
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {comments.length}
            </Box>
          </Typography>
        </Stack>

        <Box
          sx={{
            maxHeight: 180,
            overflowY: 'auto',
            pr: 0.5,
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }}
        >
          <Stack spacing={1}>
            {comments.map((comment) => (
              <Paper
                key={comment.id}
                elevation={0}
                sx={{
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  bgcolor: 'background.paper'
                }}
              >
                <Typography variant="body2">
                  {comment.text}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Box>
      </Stack>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
        sx={{ marginY: '10px' }}
      >
        Kommentieren
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Kommentar schreiben</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            multiline
            minRows={3}
            placeholder="Dein Kommentar ..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Abbrechen
          </Button>

          <Button variant="contained" onClick={handleSubmit} disabled={!input.trim()}>
            Senden
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  )
}

CommentSection.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  })),
  onAddComment: PropTypes.func
}

export default CommentSection
