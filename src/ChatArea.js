import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faUserPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './ChatArea.css';
export default function ChatArea({ chat, updateChat, setChatViewStatus, messagesEndRef, chatClient, publish }){
  const closeChat=()=>{
    setChatViewStatus(false);
    //document.querySelector('#chat_area').classList.toggle('hide');
    //document.querySelector('#open_chat_button').classList.toggle('hide');
    //document.querySelector('#close_chat_button').classList.toggle('hide');
  }
  const displayChat=()=>{
    if(chat){
      return chat.map((msg,index)=>{
        if(msg.sender==='self'){
          return(
            <div className="outgoing_message" key={'msg_'+index}>
              <div>{msg.message}</div>
              <div className="outgoing_time">{(new Date()).getHours()+":"+(new Date()).getMinutes()}</div>
            </div>
          )
        }
        else{
          return(
            <div className="incoming_message_container" key={'msg_'+index}>
              <div className="incoming_message">
                <div>{msg.message}</div>
                <div className="incoming_time">{msg.sender} {(new Date()).getHours()+":"+(new Date()).getMinutes()}</div>
              </div>
            </div>
          )
        }
      })
    }
  }
  const sendMessage=()=>{
    var message=document.querySelector('#message_to_send').value;
    document.querySelector('#message_to_send').value='';
    if(!message) return;
    updateChat([...chat,{sender:'self',message:message}]);
    publish('topic',message,0);
    //console.log([...chat,{sender:'self',message:message}])
  }
  const triggerMessage=(event)=>{
    if(event.keyCode===13)
      sendMessage();
  }
  return(
    <div id={'chat_area'}>
      <div className="chat_section">
        <div id="close_chat_button" onClick={closeChat}>
          <FontAwesomeIcon icon={faWindowClose} color={'red'} size={'1x'}/>
        </div>
        <div className="chat">
          <div className="chat_messages" id="chat_messages">
            <div className="incoming_message_container">
              <div className="incoming_message">
                <div>message 1</div>
                <div className="incoming_time">cvcvxvxvvvxvxv {(new Date()).getHours()+":"+(new Date()).getMinutes()}</div>
              </div>
            </div>
            <div className="outgoing_message">
              <div>message 1</div>
              <div className="outgoing_time">{(new Date()).getHours()+":"+(new Date()).getMinutes()}</div>
            </div>
            {displayChat()}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="message_typing_section">
          <input type="text" className="message_input" id="message_to_send" onKeyDown={triggerMessage}/>
          <button className="invite">
            <FontAwesomeIcon icon={faUserPlus} color={'red'}/>
          </button>
          <button className="message_send" onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} color={'blue'}/>
          </button>
        </div>
      </div>
    </div>
  )
}
