import React, { useEffect } from 'react'

const ChatMessages = ({ messages }) => {
  useEffect(() => {
    // Change?? https://stackoverflow.com/questions/59198952/using-document-queryselector-in-react-should-i-use-refs-instead-how
    document.querySelector('.chat-messages').scrollTo(0, document.querySelector(".chat-messages").scrollHeight)
  }, [messages])

  return (
    <>
      <ul className="chat-messages">
        {messages.map(msg => {
          if (msg.isSelf === true) {
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
