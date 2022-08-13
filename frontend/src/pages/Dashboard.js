import React, { useState } from 'react'
import ChatRoomMenu from '../components/Dashboard/ChatRoomMenu'
import ChatRoom from '../components/Dashboard/ChatRoom'

const Dashboard = () => {
  const [isChatRoomMenuOpen, setIsChatRoomMenuOpen] = useState(false)

  const handleToggleDashboardMenu = () => {
    if(isChatRoomMenuOpen) {
      setIsChatRoomMenuOpen(false)
    } else {
      setIsChatRoomMenuOpen(true)
    }
  }

  return (
    <div className='dashboard'>
      <div className="dashboard-header">
        <button onClick={handleToggleDashboardMenu}>Menu</button>
        <h1>Dashboard page</h1>
      </div>
      <ChatRoomMenu isOpen={isChatRoomMenuOpen} />
      <div style={{ height: '600px' }}>
        <ChatRoom />
      </div>
    </div>
  )
}

export default Dashboard