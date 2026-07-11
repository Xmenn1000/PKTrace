import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ChallengeOverview from './ChallengeOverview'
import CommentSection from '../commentSection/CommentSection'
import {
  getChallengeById,
  getChallengeImages,
  addComment
} from '../../../data/challenge'

const ChallengeDBParser = ({ id }) => {
  const challenge = getChallengeById(id)

  if (!challenge) {
    return <div>Challenge not found.</div>
  }

  const images = getChallengeImages(challenge.imagesId)

  const [comments, setComments] = useState(challenge.comments)

  const handleAddComment = (text) => {
    const newComment = addComment(challenge.id, text)

    setComments(prev => [...prev, newComment])
  }

  const commentSection = (
    <CommentSection
      comments={comments}
      onAddComment={handleAddComment}
    />
  )

  return (
    <ChallengeOverview
      id={id}
      images={images}
      descriptions={challenge.description}
      commentSection={commentSection}
    />
  )
}

ChallengeDBParser.propTypes = {
  id: PropTypes.number
}

export default ChallengeDBParser
