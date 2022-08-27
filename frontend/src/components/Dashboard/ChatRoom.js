import React from 'react'
import ChatMessages from './ChatMessages'

const ChatRoom = () => {

  const devMsg = [{
    isYou: true, 
    message: 'Hej!'
  },{
    isYou: false, 
    message: 'Hallå!!!'
  },{
    isYou: true, 
    message: 'Detta är lite text..dadsadsadasd ffaffsdfsdfsdlngsdngdsnldsgsjdgsdjgbjsdgljsdlglgsbgslgslbgslfsdfsdfsdffssdfsdfsdfsfsfdsfdsfsffsdfaf asddsadsadasdasdasdsadbbndasdsadsan'
  },{
    isYou: true, 
    message: 'en fråga till dig....'
  },{
    isYou: false, 
    message: 'jaha'
  },{
    isYou: true, 
    message: 'hörs!'
  },{
    isYou: true, 
    message: 'en fråga till dig....'
  },{
    isYou: false, 
    message: 'jaha'
  },{
    isYou: true, 
    message: 'hörs!'
  },{
    isYou: true, 
    message: 'en fråga till dig....'
  },{
    isYou: false, 
    message: 'jaha'
  },{
    isYou: true, 
    message: 'hörs!'
  }]

  return (
    <div className="chat-room">
      <div className="room-header">
        <h1>Anders</h1>
      </div>
      <div className="message-container">
        <ChatMessages messages={devMsg} />
      </div>
      <div className="room-input-menu">
        <form>
          <input className="message-input" type="text" placeholder="Message..."  />
          <input className="send-btn" type="button" value="Send" />
        </form>
      </div>
    </div>
  )
}

export default ChatRoom
