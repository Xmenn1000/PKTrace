import React, { useState, useEffect, createContext, useContext, useMemo } from 'react'
import spotsData from '../data/SpotsData.json'

const DBContext = createContext()

export const DBProvider = ({ children }) => {
  const [spots] = useState(spotsData)
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const db = useMemo(() => ({
    spots: {
      getAll: () => spots,
      getById: (id) => spots.find((s) => s.id === id)
    },
    user: {
      get: () => user,
      save: (userData) => setUser(userData)
    }
  }), [spots, user])

  return (
    <DBContext.Provider value={db}>
      {children}
    </DBContext.Provider>
  )
}

export const useDataBase = () => useContext(DBContext)
