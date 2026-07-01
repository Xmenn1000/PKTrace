import {
  Button,
  Stack,
  Typography,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SkillLevel from './level'

const Welcome = () => {
  const [name, setName] = useState('')
  const [level, setLevel] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const detectedLevel = location.state?.detectedLevel
    if (detectedLevel && Object.values(SkillLevel).includes(detectedLevel)) {
      setLevel(detectedLevel)
    }
  }, [location.state])

  const handleClick = () => {
    navigate('/profile')
  }

  return (
    <Stack
      flex="1 1 auto"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      width={320}
    >
      <Typography variant="h4">
        Willkommen bei PK Trace
      </Typography>

      <Typography variant="body1">
        Verrate uns wie du heißt...
      </Typography>

      <TextField
        label="Name"
        variant="outlined"
        value={name}
        required
        fullWidth
        onChange={(event) => {
          setName(event.target.value)
        }}
      />

      <Typography variant="body1">
        ...und wie gut dein Parkour Skill-Level bereits ist
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="skill-level-label">Skilllevel</InputLabel>

        <Select
          labelId="skill-level-label"
          id="skill-level"
          value={level}
          label="Skilllevel"
          onChange={(event) => {
            setLevel(event.target.value)
          }}
        >
          <MenuItem value={SkillLevel.LOW}>Beginner</MenuItem>
          <MenuItem value={SkillLevel.MID}>Medium</MenuItem>
          <MenuItem value={SkillLevel.HIGH}>Expert</MenuItem>
        </Select>
      </FormControl>

      <Link to="/tutorial">
        Du kannst dein Skill nicht so gut einschätzen? Starte hier unseren Skilltest!
      </Link>

      {/* TODO: ADD SAVE USER  */}
      <Button variant="contained" disabled={!name || !level} onClick={handleClick}>
        Weiter
      </Button>
    </Stack>
  )
}

export default Welcome
