import React from 'react'
import CommonPage from '../CommonPage'
import ChallengeDBParser from '../../Components/challenge/ChallengeDBParser'

const ChallengePage = ({ id, title, subtitle, backUrl }) => (
  <CommonPage title={title} subtitle={subtitle} backUrl={backUrl}>
    <ChallengeDBParser id={id} />
  </CommonPage>
)
export default ChallengePage
