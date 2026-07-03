import { Card } from '@mui/material'
import React, { useState } from 'react'
import Challenge from './Challenge'
import CommentSection from '../commentSection/CommentSection'

const ChallengeDBParser = ({ id }) => {
  const getChallengeFromDB = () => {
    console.log(`TestClass, should use ${id}`)
    const images = [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSmRsHCT597H_wQju_wmNnzsA5V8VVToP5l7e1fp3ujNMvm9PlMgk9ggg&s'
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QRHsKZRioSp_kte9ywn_ft-um3nmpEmzePXghOi1vA&s=10'
      }
    ]
    const descriptions = [
      'kjjfskjyf kjsh<s kjs<jk fsyjkd fysjkdh fsyjkd fyjks sydhkg sd',
      '56545646584lkjjfjf <jks fj<ksfjk <sfjk <shjkf s<jkf < <jkd fjk<h d    mcnvmxynvkj564 dc5444',
      'jfh<sfs<fg'
    ]
    const doSomething = () => {
      console.log('Start Button was pressed')
    }
    return { images, descriptions, doSomething }
  }

  const { images, descriptions, doSomething } = getChallengeFromDB()
  const [comments, setComments] = useState([
    {
      id: Date.now() + Math.random(),
      text: 'Eine Oma'
    },
    {
      id: Date.now() + Math.random(),
      text: 'Random Oma'
    },
    {
      id: Date.now() + Math.random(),
      text: 'OMAS ÜBERNEHMEN DIE ERDE'
    },
    {
      id: Date.now() + Math.random(),
      text: 'OMAS ÜBERNEHMEN DAS MULTIVERSUM'
    }
  ])
  const onAddComment = (text) => {
    setComments(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        text
      }
    ])
  }
  const commentSection = (
    <CommentSection comments={comments} onAddComment={onAddComment} />
  )
  return (
    <Challenge images={images} descriptions={descriptions} onStart={doSomething} commentSection={commentSection} />
  )
}
export default ChallengeDBParser
