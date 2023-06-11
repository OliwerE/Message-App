import React, { useEffect, useState } from 'react'

import { onUserDisconnected, onUsers, onUserConnected } from '../../api/socket'

const ChatRoomMenu = ({ handleChangeChatRoom }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    onUsers(setUsers)
    onUserConnected(users, setUsers)
    onUserDisconnected(setUsers)
  }, [users])

  return (
    <div className="chat-room-menu">
      <div className="contact-nav">
        {/* <h2>My Chats</h2> */}
        <h2>Users</h2>
      </div>
      <ul onClick={handleChangeChatRoom}>
      {users.map((user, i) => {
        return (
        <li key={i}>
          <div id={user.userID} className="contact-name">{user.username} {user.isSelf ? '(yourself)' : null}</div>
          {user.connected ? <p style={{ fontWeight: 'bold', color: 'green', margin: 0, padding: 0, width: 'fit-content' }}>Online</p> : <p style={{ fontWeight: 'bold', color: 'red', margin: 0, padding: 0 }}>Offline</p>}
          {/* <div className="contact-last-message">{contact.lastMessage}</div> */}
          {/* <div className="contact-time-ago">{contact.lastMessageTimeAgo}</div> */}
          {/* <div className="contact-new-msg-count">
            {contact.newMessageCount > 0 ? (
              <div>
                {contact.newMessageCount}
              </div>
            ) : null}
          </div> */}
        </li>
        ) 
      })}
      </ul>
    </div>
  )
}

export default ChatRoomMenu
