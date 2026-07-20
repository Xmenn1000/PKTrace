import React, { useState, createContext, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import spotsData from '../data/SpotsData.json'

const DBContext = createContext()

export const DBProvider = ({ children }) => {
  const [spots] = useState(spotsData)

  const db = useMemo(() => ({
    spots: {
      getAll: () => spots,
      getById: (id) => spots.find((s) => s.id === id)
    }
  }), [spots])

  return (
    <DBContext.Provider value={db}>
      {children}
    </DBContext.Provider>
  )
}

DBProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export const useDataBase = () => useContext(DBContext)
