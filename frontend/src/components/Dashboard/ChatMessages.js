import React, { useEffect } from 'react'

const ChatMessages = ({ messages, chatUsername }) => {
  useEffect(() => {
    // Change?? https://stackoverflow.com/questions/59198952/using-document-queryselector-in-react-should-i-use-refs-instead-how
    document.querySelector('.chat-messages').scrollTo(0, document.querySelector(".chat-messages").scrollHeight)
  }, [messages])

  return (
    <>
      <ul className="chat-messages">
        {messages !== undefined ? messages.map((msg, i) => {
          if (msg.isSelf === true) {
            return <li className="my-msg" key={i}>
              <div>
                {msg.message}
              </div>
            </li>
          } else {
            return <li className="msg" key={i}>
              <div>
                <span><b>{chatUsername}:</b> {msg.message}</span>
              </div>
            </li>
          }
        }) : null }
      </ul>
    </>
  )
}

export default ChatMessages
