import * as React from 'react'
import { useState } from 'react'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

import { borderRadius, margin, maxWidth, textAlign, width } from '@mui/system'

import { useNavigate } from 'react-router-dom'
import { getAllChallenges, difficultyColors } from '../../../data/challenge'
import ChallengeCard from '../challenge/ChallengeCard'

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

      <p />

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle align="center">Schwierigkeitsgrade</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" component="div">
            <Stack spacing={2} direction="row">
              <div>
                <p>Leicht</p>
                <span
                  style={{
                    width: '80px',
                    height: '50px',
                    backgroundColor: difficultyColors.easy.backgroundColor,
                    display: 'inline-block',
                    borderRadius: '3px'
                  }}
                />
              </div>
              <div>
                <p>Mittel</p>
                <span
                  style={{
                    width: '80px',
                    height: '50px',
                    backgroundColor: difficultyColors.medium.backgroundColor,
                    display: 'inline-block',
                    borderRadius: '3px'
                  }}
                />
              </div>
              <div>
                <p>Schwer</p>
                <span
                  style={{
                    width: '80px',
                    height: '50px',
                    backgroundColor: difficultyColors.hard.backgroundColor,
                    display: 'inline-block',
                    borderRadius: '3px'
                  }}
                />
              </div>
              <div>
                <p>Selbständig</p>
                <span
                  style={{
                    width: '80px',
                    height: '50px',
                    backgroundColor: difficultyColors.dynamisch.backgroundColor,
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

const Challenge = ({ spot }) => {
  const navigate = useNavigate()
  const challenges = getAllChallenges()

  const spotChallenges = challenges.filter((challenge) => spot.challenges.includes(challenge.id))

  return (
    <>
      <h1>Spot Challenges</h1>

      <AlertDialogSlide />

      <Stack spacing={2} direction="column" sx={{ mt: 3 }}>
        {spotChallenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </Stack>
    </>
  )
}

export default Challenge
