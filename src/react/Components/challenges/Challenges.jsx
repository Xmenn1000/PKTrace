import * as React from 'react'
import { useState } from 'react'

import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

import challenges from '../../../data/challenges.json'
import './Challenge.css'
import { borderRadius, margin, maxWidth, textAlign, width } from '@mui/system'

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />)

const AlertDialogSlide = () => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        INFO
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"

        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '420px'
          }
        }}
      >
        <DialogTitle align="center">Schwierigkeitsgrade</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Stack spacing={2} direction="row">
              <div>
                <p>Leicht</p>
                <Box
                  component="span"
                  sx={{
                    width: '80px',
                    height: '50px',
                    backgroundColor: 'difficulty.easy',
                    display: 'inline-block',
                    borderRadius: '3px'
                  }}
                />
              </div>
              <div>
                <p>Mittel</p>
                <Box
                  component="span"
                  sx={{
                    width: '80px',
                    height: '50px',
                    backgroundColor: 'difficulty.medium',
                    display: 'inline-block',
                    borderRadius: '3px'
                  }}
                />
              </div>
              <div>
                <p>Schwer</p>
                <Box
                  component="span"
                  sx={{
                    width: '80px',
                    height: '50px',
                    backgroundColor: 'difficulty.hard',
                    display: 'inline-block',
                    borderRadius: '3px'
                  }}
                />
              </div>
              <div>
                <p>Selbständig</p>
                <Box
                  component="span"
                  sx={{
                    width: '80px',
                    height: '50px',
                    backgroundColor: 'difficulty.dynamisch',
                    display: 'inline-block',
                    borderRadius: '3px'
                  }}
                />
              </div>
            </Stack>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Schließen</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const SpotChallenges = () => {
  const [clicked, onClickChange] = useState(null)

  return (
    <>
      <h1>Spot Challenges</h1>

      <AlertDialogSlide />

      <p />

      <Stack spacing={2} direction="column">
        {challenges.map((challenge) => (
          <Button
            key={challenge.id}
            sx={{
              backgroundColor: `difficulty.${challenge.level}`
            }}
            variant="contained"
            onClick={() => onClickChange(challenge)}
          >
            {challenge.title}
          </Button>
        ))}
      </Stack>
    </>
  )
}

export default SpotChallenges
