import React from 'react'
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal'
import CommonPage from '../Layouts/CommonPage'
import ChallengeDBParser from '../../Components/challenge/ChallengeDBParser'

const ChallengePage = ({ id, title, subtitle, backUrl }) => (
  <CommonPage title={title} subtitle={subtitle} headerAktions={<AutoFixNormalIcon />} showHome={false} backUrl={backUrl}>
    <ChallengeDBParser id={id} />
  </CommonPage>
)
export default ChallengePage
