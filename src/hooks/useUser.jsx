import PropTypes from 'prop-types'
import React, { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user')
      return storedUser ?
        JSON.parse(storedUser) : {
          name: '',
          skillLevel: '',
          doneChallenges: []
        }
    } catch {
      return {
        name: '',
        skillLevel: '',
        doneChallenges: []
      }
    }
  })

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const setName = (name) => setUser((prev) => ({ ...prev, name }))
  const setSkillLevel = (skillLevel) => setUser((prev) => ({ ...prev, skillLevel }))
  const isUserValid = () => Boolean(user?.name && user?.skillLevel)

  const addDoneChallenge = (id, timeElapsed) => {
    setUser(prev => {
      const doneChallenges = prev.doneChallenges ?? []

      const existing = doneChallenges.find(challenge => challenge.challengeId === id)
      if (existing) {
        if (timeElapsed >= existing.recordTimeMillis) {
          return prev
        }
        return {
          ...prev,
          doneChallenges: doneChallenges.map(challenge => (challenge.challengeId === id ? { ...challenge, recordTimeMillis: timeElapsed } : challenge))
        }
      }
      return {
        ...prev,
        doneChallenges: [
          ...doneChallenges,
          {
            challengeId: id,
            whenAccomplished: Date.now(),
            recordTimeMillis: timeElapsed
          }
        ]
      }
    })
  }

  return (
    <UserContext.Provider value={{ user, setUser, setName, setSkillLevel, isUserValid, addDoneChallenge }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
