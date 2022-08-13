import React from 'react'
import ChatRoomMenu from '../components/Dashboard/ChatRoomMenu'
import ChatRoom from '../components/Dashboard/ChatRoom'

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard page</h1>
      <ChatRoomMenu />

      <div style={{ width: '300px', height: '500px' }}>
        <ChatRoom />
      </div>
    </div>
  )
}

export default Dashboard