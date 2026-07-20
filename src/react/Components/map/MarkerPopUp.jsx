import React from 'react'
import { Modal } from '@mui/material'

const MarkerPopUp = ({ isOpen, spot, onClose }) => (
  <Modal
    open={isOpen}
    onClose={onClose}
  >
    <h1>Hallo Welt</h1>
  </Modal>
)

export default MarkerPopUp
