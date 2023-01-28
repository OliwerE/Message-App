import React, { useEffect, useState } from 'react'
// import '../../css/chat-room-menu.css'

const ChatRoomMenu = ({ socket, handleChangeChatRoom }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    socket.current.on('users', connectedUsers => { // ToDo Sort users
      setUsers(users => [...users, ...connectedUsers])
    })

    // Add connected user
    socket.current.on("user connected", (user) => { // ToDo Sort users
      setUsers(users => [...users, user])
    })
  }, [])

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
