import React from 'react'
import { InputLabel, Select, MenuItem, FormControl } from '@mui/material'
import SkillLevel from '../../Pages/tutorial/level'

const PickDifficulty = ({ currentDifficulty, setDifficulty }) => (
  <FormControl fullWidth>
    <InputLabel id="skill-level-label">Level auswählen</InputLabel>
    <Select
      labelId="skill-level-label"
      id="skill-level"
      value={currentDifficulty}
      label="Level auswählen"
      onChange={(event) => setDifficulty(event.target.value)}
    >
      <MenuItem value={SkillLevel.LOW}>{SkillLevel.LOW}</MenuItem>
      <MenuItem value={SkillLevel.MID}>{SkillLevel.MID}</MenuItem>
      <MenuItem value={SkillLevel.HIGH}>{SkillLevel.HIGH}</MenuItem>
    </Select>
  </FormControl>)

export default PickDifficulty
