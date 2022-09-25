import React from 'react'

const ChatMessages = ({ messages }) => {
  return (
    <>
      <ul className="chat-messages">
        {messages.map(msg => {
          if (msg.isYou === true) {
            return <li className="my-msg">
              <div>
                {msg.message}
              </div>
            </li>
          } else {
            return <li className="msg">
              <div>
                <span><b>{msg.user}:</b> {msg.message}</span>
              </div>
            </li>
          }
        })}
      </ul>
    </>
  )
}

export default ChatMessages
