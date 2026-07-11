import React, { useState } from 'react'
import Challenge from './ChallengeOverview'
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
      images={images}
      descriptions={challenge.description}
      onStart={handleStart}
      commentSection={commentSection}
    />
  )
}

export default ChallengeDBParser
