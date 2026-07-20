import React, { useEffect, useState } from 'react'

import { useOutletContext } from 'react-router-dom'

import { FormControl, RadioGroup, FormControlLabel, Radio, useColorScheme, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import PickDifficulty from '../../Components/common/PickDifficulty'
import { useUser } from '../../../hooks/useUser'
import PickName from '../../Components/common/PickName'

const ProfileSettings = () => {
  const { user, setSkillLevel, setName } = useUser()
  const { mode, setMode } = useColorScheme()
  const { setSubtitle } = useOutletContext()
  useEffect(() => { setSubtitle('Einstellungen') }, [])

  const [nameDraft, setNameDraft] = useState(user?.name ?? '')

  useEffect(() => {
    if (nameDraft.trim()) setName(nameDraft.trim())
  }, [nameDraft, setName])

  return (
    <Stack
      sx={{
        width: '100%',
        gap: 3,
        overflowY: 'auto',
        py: 2
      }}
    >

      <stack>
        <Typography variant="body1" textAlign="center">
          Theme
        </Typography>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            gap: 4,
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            borderRadius: 1,
            minHeight: '56px'
          }}
        >
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-theme-toggle"
              name="theme-toggle"
              row
              value={mode}
              onChange={(event) => setMode(event.target.value)}
            >
              <FormControlLabel value="system" control={<Radio />} label="System" />
              <FormControlLabel value="light" control={<Radio />} label="Light" />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
            </RadioGroup>
          </FormControl>
        </Box>
      </stack>

      <stack>
        <Typography variant="body1" textAlign="center" mb="4px">
          Name
        </Typography>
        <PickName value={nameDraft} setValue={setNameDraft} />
      </stack>
      <stack>
        <Typography variant="body1" textAlign="center" mb="4px">
          SkillLevel
        </Typography>
        <PickDifficulty currentDifficulty={user.skillLevel} setDifficulty={setSkillLevel} />
      </stack>
    </Stack>
  )
}

export default ProfileSettings
