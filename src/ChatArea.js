import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faUserPlus, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './ChatArea.css';
export default function ChatArea(){
  const closeChat=()=>{
    document.querySelector('#chat_area').classList.toggle('hide');
    document.querySelector('#open_chat_button').classList.toggle('hide');
    document.querySelector('#close_chat_button').classList.toggle('hide');
  }

  return(
    <div id={'chat_area'} className={['hide']}>
      <div className="chat_section">
        <div id="close_chat_button" className="hide" onClick={closeChat}>
          <FontAwesomeIcon icon={faWindowClose} color={'red'} size={'x'}/>
        </div>
        <div className="chat">
          <div className="chat_messages">
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
          </div>
        </div>
        <div className="message_typing_section">
          <input type="text" className="message_input"/>
          <button className="invite">
            <FontAwesomeIcon icon={faUserPlus} color={'red'}/>
          </button>
          <button className="message_send">
            <FontAwesomeIcon icon={faPaperPlane} color={'blue'}/>
          </button>
        </div>
      </div>
    </div>
  )
}
