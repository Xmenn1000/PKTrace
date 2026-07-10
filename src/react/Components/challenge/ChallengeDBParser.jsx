import React, { useState } from 'react'
import Challenge from './Challenge'
import CommentSection from '../commentSection/CommentSection'
import { getChallengeById, addComment } from '../../../data/challenge'

const ChallengeDBParser = ({ id }) => {
  const challenge = getChallengeById(id)

  const [comments, setComments] = useState(challenge.comments)

  const handleStart = () => {
    console.log('Start Button was pressed')
  }

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
    <Challenge
      images={challenge.images}
      descriptions={challenge.description}
      onStart={handleStart}
      commentSection={commentSection}
    />
  )
}

export default ChallengeDBParser
