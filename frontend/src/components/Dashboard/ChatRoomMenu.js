import React, { useEffect, useState } from 'react'

import { onUserDisconnected, onUsers, onUserConnected } from '../../api/socket'

const ChatRoomMenu = ({ handleChangeChatRoom }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    onUsers(setUsers)
    onUserConnected(users, setUsers)
    onUserDisconnected(setUsers)
  }, [users]) // fix: [users] causes multiple events!

  return (
    <div className="chat-room-menu">
      <div className="contact-nav">
        {/* <h2>My Chats</h2> */}
        <h2>Online</h2>
      </div>
      <ul onClick={handleChangeChatRoom}>
      {users.map((user, i) => {
        return (
        <li key={i}>
          <div id={user.userID} className="contact-name">{user.username}</div>
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
