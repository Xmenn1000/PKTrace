import React from 'react'
import { useParams } from 'react-router-dom'
import CommonPage from '../Layouts/CommonPage'
import ChallengeDBParser from '../../Components/challenge/ChallengeDBParser'
import { getChallengeById } from '../../../data/challenge'

const ChallengePage = () => {
  const { id } = useParams()

  const challenge = getChallengeById(id)

  if (!challenge) {
    return (
      <CommonPage title="Challenge nicht gefunden" backUrl="/challenges">
        <p>
          Diese Challenge existiert nicht. ID:
          {id}
        </p>
      </CommonPage>
    )
  }

  return (
    <CommonPage
      title={challenge.title}
      subtitle={challenge.level}
      showGoBack
    >
      <ChallengeDBParser id={id} />
    </CommonPage>
  )
}

export default ChallengePage
