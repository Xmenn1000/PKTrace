import React, { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'))
    } catch (e) {
      return undefined
    }
  })

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const setName = (name) => setUser((prev) => ({ ...prev, name }))
  const setSkillLevel = (skillLevel) => setUser((prev) => ({ ...prev, skillLevel }))
  const isUserValid = () => Boolean(user?.name && user?.skillLevel)

  return (
    <UserContext.Provider value={{ user, setUser, setName, setSkillLevel, isUserValid }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
