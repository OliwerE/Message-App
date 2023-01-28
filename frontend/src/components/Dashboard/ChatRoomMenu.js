import React, { useEffect, useState } from 'react'
// import '../../css/chat-room-menu.css'

const ChatRoomMenu = ({ isOpen, socket }) => {
  const [users, setUsers] = useState([])

  const tempContacts = [
    { name: 'Anders'
    , lastMessage: 'Lorem ipsum dolor sit amet',
    lastMessageTimeAgo:
    '1 hours ago',
    newMessageCount: 5
  }, { name: 'Kalle'
    , lastMessage: 'consectetur adipiscing elit',
    lastMessageTimeAgo:
    '5 days ago',
    newMessageCount: 0
  }, { name: 'Olle'
    , lastMessage: 'Praesent luctus velit',
    lastMessageTimeAgo:
    '7 seconds ago',
    newMessageCount: 3
  }]

  useEffect(() => {
    socket.current.on('users', connectedUsers => { // ToDo Sort users
      setUsers(users => [...users, ...connectedUsers])
    })

    // Add connected user
    socket.current.on("user connected", (user) => { // ToDo Sort users
      setUsers(users => [...users, user])
    })
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.querySelector('.chat-room-menu').style.left = '0'
    } else {
      document.querySelector('.chat-room-menu').style.left = '-320px'
    }
  }, [isOpen])

  return (
    <div className="chat-room-menu">
      <div className="contact-nav">
        {/* <h2>My Chats</h2> */}
        <h2>Online</h2>
      </div>
      <ul>
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
