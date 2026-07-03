import React from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import challenges from '../../../data/challenges.json'
import CommonPage from '../Layouts/CommonPage'

const RowAndColumnSpacing = () => (
  <CommonPage title="Test">
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={3}>
        {challenges.map((challenge) => (
          <Grid size={6} key={challenge.id}>
            <Button sx={{ backgroundColor: `difficulty.${challenge.level}`, width: '100%', height: '100%' }}>{challenge.title}</Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  </CommonPage>
)

export default RowAndColumnSpacing
