import React, { useEffect } from 'react'
// import '../../css/chat-room-menu.css'

const ChatRoomMenu = ({ isOpen }) => {
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
    if (isOpen) {
      document.querySelector('.chat-room-menu').style.left = '0'
    } else {
      document.querySelector('.chat-room-menu').style.left = '-450px'
    }
  }, [isOpen])

  return (
    <div className="chat-room-menu">
      <div className="contact-nav">
        <h2>My Chats</h2>
      </div>
      <ul>
      {tempContacts.map((contact, i) => {
        return (
        <li key={i}>
          <div className="contact-name">{contact.name}</div>
          <div className="contact-last-message">{contact.lastMessage}</div>
          <div className="contact-time-ago">{contact.lastMessageTimeAgo}</div>
          <div className="contact-new-msg-count">
            {contact.newMessageCount > 0 ? (
              <div>
                {contact.newMessageCount}
              </div>
            ) : null}
          </div>
        </li>
        ) 
      })}
      </ul>
    </div>
  )
}

export default ChatRoomMenu
